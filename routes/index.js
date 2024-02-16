const express = require('express');
const router = express.Router();
const userAuth = require('../controllers/middlewares');
const getFolders = require('../controllers/folders');

// Definimos las rutas y tareas:

router.get('/folders', userAuth, getFolders);

module.exports = router;