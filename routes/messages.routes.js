const express = require('express');
const messagesRouter = express.Router();
const { getMessages, postMessage, deleteMessage, updateMessage, countMail } = require('../controllers/messages.controller');

// Definimos las rutas y tareas:

messagesRouter.get('/', getMessages);
messagesRouter.post('/', postMessage);
messagesRouter.delete('/:id', deleteMessage);
messagesRouter.put('/:id', updateMessage);
messagesRouter.get('/count', countMail);

module.exports = messagesRouter;