const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Datos invalidos",
            errores: errors.array().map((error) => ({
                campo: error.path,
                mensaje: error.msg,
            })),
        });
    }

    next();
};

module.exports = validateRequest;
