const { body } = require("express-validator");
const { idParam } = require("./commonValidators");

const cursoBody = [
    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 100 })
        .withMessage("El nombre no puede superar 100 caracteres"),
    body("horas")
        .isInt({ min: 1 })
        .withMessage("Las horas deben ser un entero positivo")
        .toInt(),
    body("profesor_id")
        .isInt({ min: 1 })
        .withMessage("El profesor_id debe ser un entero positivo")
        .toInt(),
];

module.exports = {
    createCurso: cursoBody,
    updateCurso: [...idParam(), ...cursoBody],
    deleteCurso: idParam(),
};
