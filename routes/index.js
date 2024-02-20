const express = require('express');
const router = express.Router();

const messageRoutes = require('./messages.routes');
const foldersRoutes = require('./folders.routes');

router.use('/messages', messageRoutes);
router.use('/folders', foldersRoutes);

module.exports = router;