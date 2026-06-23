const { body } = require("express-validator");
const { idParam } = require("./commonValidators");

const alumnoBody = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar 100 caracteres"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("El email debe ser valido")
        .isLength({ max: 50 })
        .withMessage("El email no puede superar 50 caracteres")
        .normalizeEmail(),
    body("edad")
        .isInt({ min: 0, max: 149 })
        .withMessage("La edad debe ser un entero entre 0 y 149")
        .toInt(),
];

module.exports = {
    createAlumno: alumnoBody,
    updateAlumno: [...idParam(), ...alumnoBody],
    deleteAlumno: idParam(),
};
