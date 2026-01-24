// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const imgSchema = require('./model');
const multer = require('multer');
require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, './views')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
					useNewUrlParser: true, useUnifiedTopology: true
                })
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Multer setup for file uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to render image upload page and display images
app.get('/', (req, res) => {
    imgSchema.find({})
        .then(data => {
            res.render('imagepage', { items: data });
        })
        .catch(err => console.log(err));
});

// Route to handle image upload
app.post('/', upload.single('image'), (req, res, next) => {
    const obj = {
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    };
    imgSchema.create(obj)
        .then(item => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, err => {
    if (err) throw err;
    console.log(`Server listening on port ${port}`);
});
