const Curso = require("../models/Curso");
const { sendDbError, sendNotFound } = require("./controllerUtils");

const getCursos = async (req, res) => {
    try {
        const resultado = await Curso.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createCurso = async (req, res) => {
    try {
        const { nombre, horas, profesor_id } = req.body;
        const resultado = await Curso.create(nombre, horas, profesor_id);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const updateCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, horas, profesor_id } = req.body;
        const resultado = await Curso.update(id, nombre, horas, profesor_id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Curso");
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const deleteCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Curso.remove(id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Curso");
        }

        res.json({ mensaje: "Curso eliminado", curso: resultado.rows[0] });
    } catch (error) {
        sendDbError(res, error);
    }
};

module.exports = {
    getCursos,
    createCurso,
    updateCurso,
    deleteCurso,
};
