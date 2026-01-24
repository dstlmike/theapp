// model.js

const mongoose = require('mongoose');
const imgSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});
module.exports = mongoose.model('Image', imgSchema);
