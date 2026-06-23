const { body } = require("express-validator");
const { idParam } = require("./commonValidators");

const matriculaBody = [
    body("alumno_id")
        .isInt({ min: 1 })
        .withMessage("El alumno_id debe ser un entero positivo")
        .toInt(),
    body("curso_id")
        .isInt({ min: 1 })
        .withMessage("El curso_id debe ser un entero positivo")
        .toInt(),
    body("fecha_matricula")
        .isISO8601({ strict: true })
        .withMessage("La fecha_matricula debe tener formato YYYY-MM-DD"),
];

module.exports = {
    createMatricula: matriculaBody,
    updateMatricula: [...idParam(), ...matriculaBody],
    deleteMatricula: idParam(),
};
