const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String },
    title: { type: String },
    icon: { type: String },
})

const Folders = mongoose.model('challenge_folders', folderSchema);

module.exports = Folders;