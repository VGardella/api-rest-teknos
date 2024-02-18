const mongoose = require('mongoose');

const fromSchema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    email: { type: String }
})

const messageSchema = new mongoose.Schema({
    from: fromSchema,
    to: [{ name: String, email: String }],
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

module.exports = Message