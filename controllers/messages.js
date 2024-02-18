const Message = require('../models/messages');

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

    const list = await Message.find(query);
    return res.send(list)
}

module.exports = getMessages;