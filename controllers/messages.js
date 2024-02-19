const Message = require('../models/messages').Message;

const getMessages = async (req, res) => {
    let filters = req.query;
    let query = {};

    if (Object.keys(filters).length != 0) {
        query = { $and: [] };
        
        if (filters.from) {
            query.$and.push({ 
                $or: [
                    { "from.name": { $regex: `${filters.from}`, $options: "i"}},
                    { "from.avatar": { $regex: `${filters.from}`, $options: "i"}},
                    { "from.email": { $regex: `${filters.from}`, $options: "i"}},
                ]
            })
        };
    
        if (filters.to) {
            query.$and.push({
                $or: [
                    { "to.name": { $regex: `${filters.to}`, $options: "i"}},
                    { "to.email": { $regex: `${filters.to}`, $options: "i"}}
                ]
            })
        };
    
        if (filters.subject) {
            query.$and.push({
                "subject": { $regex: `${filters.subject}`, $options: "i"}
            })
        };
    }

    try {
        const list = await Message.find(query);
        return res.status(200).send(list)    
    } catch (err) {
        return res.status(500).send('No se pudo realizar la busqueda')
    }
}

module.exports = getMessages;