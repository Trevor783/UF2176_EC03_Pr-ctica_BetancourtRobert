const { param } = require("express-validator");

const idParam = (name = "id") => [
    param(name)
        .isInt({ min: 1 })
        .withMessage(`El parametro ${name} debe ser un entero positivo`)
        .toInt(),
];

module.exports = {
    idParam,
};
