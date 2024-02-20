const mongoose = require('mongoose');

const fromSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    email: String
}, { _id: false });

const messageSchema = new mongoose.Schema({
    from: fromSchema,
    to: [{ name: String, email: String, _id: false }],
    subject: String,
    message: String,
    time: String,
    read: Boolean,
    starred: Boolean,
    important: Boolean,
    hasAttachments: Boolean,
    labels: [String],
    folder: String
});


const Message = new mongoose.model('challenge_messages', messageSchema);

module.exports = { Message, fromSchema };