const express = require('express');
const foldersRouter = express.Router();
const getFolders = require('../controllers/folders.controller');

// Definimos rutas y tareas:

foldersRouter.get('/folders', getFolders);

module.exports = foldersRouter;