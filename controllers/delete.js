const Message = require('../models/messages').Message;

const deleteMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        await Message.findByIdAndDelete(messageId);
        return res.status(200).send('Mensaje borrado.')
    }
    catch (err) {
        return res.status(500).send(`Error al borrar el mensaje: ${err}.`);
    }
}

module.exports = deleteMessage;