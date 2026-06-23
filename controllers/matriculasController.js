const Matricula = require("../models/Matricula");
const { sendDbError, sendNotFound } = require("./controllerUtils");

const getMatriculas = async (req, res) => {
    try {
        const resultado = await Matricula.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createMatricula = async (req, res) => {
    try {
        const { alumno_id, curso_id, fecha_matricula } = req.body;
        const resultado = await Matricula.create(alumno_id, curso_id, fecha_matricula);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const updateMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        const { alumno_id, curso_id, fecha_matricula } = req.body;
        const resultado = await Matricula.update(id, alumno_id, curso_id, fecha_matricula);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Matricula");
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const deleteMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Matricula.remove(id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Matricula");
        }

        res.json({ mensaje: "Matricula eliminada", matricula: resultado.rows[0] });
    } catch (error) {
        sendDbError(res, error);
    }
};

module.exports = {
    getMatriculas,
    createMatricula,
    updateMatricula,
    deleteMatricula,
};
