exports.getFolders = (req, res) => {
    fs.readFile('../Modelos/folders.json', function(err, data) {
        if (err) {
            return res.status(404).send('Archivo no encontrado');
        }
        const newData = JSON.parse(data);
        res.send(newData.data);
    })
}