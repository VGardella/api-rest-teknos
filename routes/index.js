const express = require('express');
const router = express.Router();
const getFolders = require('../controllers/folders');
const getMessages = require('../controllers/messages');
const postMessage = require('../controllers/post');
const deleteMessage = require('../controllers/delete');

// Definimos las rutas y tareas:

router.get('/folders', getFolders);
router.get('/messages', getMessages);
router.post('/messages', postMessage);
router.delete('/messages/:id', deleteMessage);

module.exports = router;