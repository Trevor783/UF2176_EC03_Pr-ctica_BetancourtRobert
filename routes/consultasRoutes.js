const express = require('express');
const router = express.Router();

const controller = require('../controllers/consultasController');

// 1
router.get('/alumnos/por-edad', controller.getAlumnosPorEdad);

// 2
router.get('/alumnos/rango', controller.getAlumnosPorRango);

// 3
router.get('/cursos/top-matriculados', controller.getCursosTop);

// 4
router.get('/matriculas/alumno-curso', controller.getMatriculasAlumnoCurso);

// 5
router.get('/profesores/curso-especialidad', controller.getProfesoresCursoEspecialidad);

// 6
router.get('/matriculas/total-por-curso', controller.getTotalPorCurso);

// 7
router.get('/matriculas/cursos-con-minimo', controller.getCursosMinimo);

module.exports = router;