// server.js

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var imgSchema = require('./model.js');
var multer = require('multer');
var path = require('path');
app.set('trust proxy', true);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, 'views')));
var connection_string = "mongodb://dstlmike1:308boonave@ac-oc5e8f9-shard-00-00.dv4owuj.mongodb.net:27017,ac-oc5e8f9-shard-00-01.dv4owuj.mongodb.net:27017,ac-oc5e8f9-shard-00-02.dv4owuj.mongodb.net:27017/sampledbb?ssl=true&replicaSet=atlas-526m7w-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
// MongoDB connection
mongoose.connect(connection_string)
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
            res.render('./views/imagepage.ejs', { items: data });
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
