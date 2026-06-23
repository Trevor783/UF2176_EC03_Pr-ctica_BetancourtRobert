const model = require('../models/consultasModels');

const parseRequiredInteger = (value, name, minValue = null) => {
  const number = Number(value);

  if (!Number.isInteger(number)) {
    const error = new Error(`El parametro "${name}" debe ser un numero entero`);
    error.status = 400;
    throw error;
  }

  if (minValue !== null && number < minValue) {
    const error = new Error(`El parametro "${name}" debe ser mayor o igual que ${minValue}`);
    error.status = 400;
    throw error;
  }

  return number;
};

const handleError = (res, err) => {
  res.status(err.status || 500).json({ error: err.message });
};

// 1
const getAlumnosPorEdad = async (req, res) => {
  try {
    const edad = parseRequiredInteger(req.query.edad, 'edad', 0);
    const data = await model.alumnosPorEdad(edad);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

// 2
const getAlumnosPorRango = async (req, res) => {
  try {
    const min = parseRequiredInteger(req.query.min, 'min', 0);
    const max = parseRequiredInteger(req.query.max, 'max', 0);

    if (min > max) {
      return res.status(400).json({ error: 'El parametro "min" no puede ser mayor que "max"' });
    }

    const data = await model.alumnosPorRango(min, max);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

// 3
const getCursosTop = async (req, res) => {
  try {
    const data = await model.cursosTopMatriculados();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

// 4
const getMatriculasAlumnoCurso = async (req, res) => {
  try {
    const data = await model.matriculasAlumnoCurso();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

// 5
const getProfesoresCursoEspecialidad = async (req, res) => {
  try {
    const data = await model.profesoresCursoEspecialidad();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

// 6
const getTotalPorCurso = async (req, res) => {
  try {
    const data = await model.totalPorCurso();
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

// 7
const getCursosMinimo = async (req, res) => {
  try {
    const min = parseRequiredInteger(req.query.min, 'min', 0);
    const data = await model.cursosMinimo(min);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  getAlumnosPorEdad,
  getAlumnosPorRango,
  getCursosTop,
  getMatriculasAlumnoCurso,
  getProfesoresCursoEspecialidad,
  getTotalPorCurso,
  getCursosMinimo
};
