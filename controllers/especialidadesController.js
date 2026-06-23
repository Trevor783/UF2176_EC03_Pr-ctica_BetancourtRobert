const Especialidad = require("../models/Especialidad");
const { sendDbError, sendNotFound } = require("./controllerUtils");

const getEspecialidades = async (req, res) => {
    try {
        const resultado = await Especialidad.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createEspecialidad = async (req, res) => {
    try {
        const { nombre, profesor_id } = req.body;
        const resultado = await Especialidad.create(nombre, profesor_id);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const updateEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, profesor_id } = req.body;
        const resultado = await Especialidad.update(id, nombre, profesor_id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Especialidad");
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const deleteEspecialidad = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Especialidad.remove(id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Especialidad");
        }

        res.json({ mensaje: "Especialidad eliminada", especialidad: resultado.rows[0] });
    } catch (error) {
        sendDbError(res, error);
    }
};

module.exports = {
    getEspecialidades,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad,
};
