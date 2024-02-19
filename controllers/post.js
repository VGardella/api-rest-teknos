const { Message, fromSchema } = require('../models/messages');

const postMessage = async (req, res) => {
    let message = req.body;

    const messageFields = Object.keys(message);
    const fromFields = Object.keys(message.from);
    const fromSchemaFields = Object.keys(fromSchema.obj);
    const messageSchemaFields = Object.keys(Message.schema.obj);        

    const subfields = fromSchemaFields.filter(key => !fromFields.includes(key));
    const fields = messageSchemaFields.filter(key => !messageFields.includes(key));

    if (subfields.length !== 0 || fields.length !== 0) {
        return res.status(400).send(`Faltan los campos: ${subfields + ',' + fields}`);
    }

    else {
        try {
            const newMessage = new Message(message);
            await newMessage.save()
            return res.status(200).send('Mensaje guardado.')
        }
        catch (err) {
            return res.status(500).send('Error al guardar el mensaje: ', err);
        }
    }




}

module.exports = postMessage;