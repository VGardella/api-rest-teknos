const express = require('express');
const router = express.Router();
const getFolders = require('../controllers/folders');

// Definimos las rutas y tareas:

router.get('/folders', getFolders);

module.exports = router;