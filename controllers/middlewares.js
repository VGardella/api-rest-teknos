// Autenticación de usuario:

const userAuth = (req, res, next) => {
    if (req.params.user !== 'teknos') {
        res.status(404).send('Usuario incorrecto');
    }
    next();
};