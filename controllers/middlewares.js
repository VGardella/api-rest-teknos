// Autenticación de usuario:

const userAuth = (req, res, next) => {
    if (req.params.user !== 'teknos') {
        return res.status(401).send('Usuario incorrecto');
    }
    next();
};

module.exports = userAuth;

/* El return se usa para que, en caso de que no se
cumpla con el condicional, no se corra el resto del
programa. Sino salta un código de error */