const Folders = require('../models/folders')

const getFolders = async (req, res) => {
    try {
        const info = await Folders.find({});
        res.send(info);
    } catch (err) {
        res.status(404).send('No se encontraron los documentos.')
    }
}

module.exports = getFolders;