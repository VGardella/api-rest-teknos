const mongoose = require('mongoose');

const fromSchema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    email: { type: String }
}, { _id: false });

const messageSchema = new mongoose.Schema({
    _id: { type: String },
    from: fromSchema,
    to: [{ name: String, email: String, _id: false }],
    subject: String,
    message: String,
    time: String,
    read: Boolean,
    starred: Boolean,
    important: Boolean,
    hasAttachments: Boolean,
    labels: [String]
});


const Message = new mongoose.model('challenge_messages', messageSchema);

module.exports = { Message, fromSchema };