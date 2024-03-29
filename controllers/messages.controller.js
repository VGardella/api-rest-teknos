const Message = require('../models/messages.model.js').Message;

const getMessages = async (req, res) => {
    // Variables:
    let filters = req.query;
    let query = { $and: [] };
    let mails;
    let mailList;

    // Lógica de filtrado:
    if (filters.from && filters.from !== undefined) {
        query.$and.push({ 
            $or: [
                { "from.name": { $regex: `${filters.from}`, $options: "i"}},
                { "from.avatar": { $regex: `${filters.from}`, $options: "i"}},
                { "from.email": { $regex: `${filters.from}`, $options: "i"}},
            ]
        })
    };

    if (filters.to && filters.to !== undefined) {
        query.$and.push({
            $or: [
                { "to.name": { $regex: `${filters.to}`, $options: "i"}},
                { "to.email": { $regex: `${filters.to}`, $options: "i"}}
            ]
        })
    };

    if (filters.subject && filters.subject !== undefined) {
        query.$and.push({
            "subject": { $regex: `${filters.subject}`, $options: "i"}
        })
    };

    if (!filters.from && !filters.to && !filters.subject) {
        delete query.$and;
    }

    // Lógica de paginación:
    if (!filters.page && filters.limit || filters.page && !filters.limit) {
        return res.status(500).send('Para paginado de los mensajes especificar número de página (page) y número de mensajes (limit)')
    }
    else if (filters.page && filters.limit) {
        mails = (parseInt(filters.page)-1)*parseInt(filters.limit);
    }


    try {
        if (filters.page && filters.limit) {

            const mailPage = await Message.aggregate([
                { $match: query },
                { $lookup : {
                        "from" : "challenge_folders",
                        "localField" : "folder",
                        "foreignField" : "name",
                        "as" : "folderInfo"
                    }
                },
                { $skip: mails },
                { $limit: parseInt(filters.limit) }
            ])
    
            const count = await Message.aggregate([
                { $match: query },
                { $count: "count" }
            ])
    
            mailList = {
                count: count[0].count,
                page: parseInt(filters.page),
                data: mailPage
            };
        }  else {
            mailList = await Message.aggregate([
                { $match: query },
                { $lookup : {
                        "from" : "challenge_folders",
                        "localField" : "folder",
                        "foreignField" : "name",
                        "as" : "folderInfo"
                    }
                }
            ]);
        }

        if (mailList.length === 0) {
            return res.status(200).send('No se encontraron mensajes.')
        }
        return res.status(200).send(mailList)    
    } catch (err) {
        return res.status(500).send('No se pudo realizar la busqueda.')
    }
}

const postMessage = async (req, res) => {
    let message = req.body;

    const messageFields = Object.keys(message);
    const messageSchemaFields = Object.keys(Message.schema.obj);        
    
    const fields = messageSchemaFields.filter(key => !messageFields.includes(key));

    if (fields.length !== 0) {
        return res.status(400).send(`Faltan los campos: ${fields}`);
    }
    else {
        try {
            const newMessage = new Message(message);
            await newMessage.save()
            return res.status(200).send('Mensaje guardado.')
        }
        catch (err) {
            if (err == "E11000") {
                res.status(500).send('El campo de "Id"se agrega automaticamente; borrar el valor asignado.')
            }
            return res.status(500).send(`Error al guardar el mensaje: ${err}`);
        }
    }
}


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


const updateMessage = async (req, res) => {
    const messageId = req.params.id;
    const changes = req.body;

    if (Object.keys(changes).length === 0) {
        return res.status(200).send('No hay cambios para realizar.');
    }

    try {
        await Message.updateOne({ "_id": messageId }, changes);
        return res.status(200).send('Mensaje actualizado.')
    } catch (err) {
        return res.status(400).send('No se pudo actualizar el mensaje.')
    }
}


const countMail = async (req, res) => {
    try {
        const mails = await Message.aggregate([{
            $group: {
                "_id": "$from.name",
                "total_emails" : { $count: {} }
            }
        }])
        return res.status(200).send(mails);
    } catch (err) {
        return res.status(500).send('No se pudo obtener lista de correos.')
    }
}



module.exports = { getMessages, postMessage, deleteMessage, updateMessage, countMail };