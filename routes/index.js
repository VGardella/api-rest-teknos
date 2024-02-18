const express = require('express');
const router = express.Router();
const getFolders = require('../controllers/folders');
const getMessages = require('../controllers/messages');

// Definimos las rutas y tareas:

router.get('/folders', getFolders);
router.get('/messages', getMessages);

module.exports = router;