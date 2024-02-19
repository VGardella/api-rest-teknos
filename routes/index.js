const express = require('express');
const router = express.Router();
const getFolders = require('../controllers/folders');
const getMessages = require('../controllers/messages');
const postMessage = require('../controllers/post');

// Definimos las rutas y tareas:

router.get('/folders', getFolders);
router.get('/messages', getMessages);
router.post('/messages', postMessage);

module.exports = router;