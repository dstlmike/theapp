// model.js

const mongoose = require('mongoose');
const imgSchema = new mongoose.Schema({
    name: String,
    img: {
        data: Buffer,
        contentType: String,
        description: String
    }
});
module.exports = mongoose.model('Image', imgSchema);
