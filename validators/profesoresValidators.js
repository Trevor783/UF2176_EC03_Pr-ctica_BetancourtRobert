const { body } = require("express-validator");
const { idParam } = require("./commonValidators");

const profesorBody = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar 100 caracteres"),
    body("edad")
        .isInt({ min: 0, max: 149 })
        .withMessage("La edad debe ser un entero entre 0 y 149")
        .toInt(),
    body("especialidad_id")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("El especialidad_id debe ser un entero positivo")
        .toInt(),
];

module.exports = {
    getProfesor: idParam(),
    createProfesor: profesorBody,
    updateProfesor: [...idParam(), ...profesorBody],
    deleteProfesor: idParam(),
};
