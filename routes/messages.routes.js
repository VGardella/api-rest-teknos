const express = require('express');
const messagesRouter = express.Router();
const { getMessages, postMessage, deleteMessage, updateMessage } = require('../controllers/messages.controller');

// Definimos las rutas y tareas:

messagesRouter.get('/messages', getMessages);
messagesRouter.post('/messages', postMessage);
messagesRouter.delete('/messages/:id', deleteMessage);
messagesRouter.patch('/messages/:id', updateMessage);

module.exports = messagesRouter;