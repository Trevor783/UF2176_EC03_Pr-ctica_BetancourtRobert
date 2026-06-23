const Profesor = require("../models/Profesor");
const { sendDbError, sendNotFound } = require("./controllerUtils");

const getProfesores = async (req, res) => {
    try {
        const resultado = await Profesor.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const getProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Profesor.findById(id);
        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Profesor");
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createProfesor = async (req, res) => {
    try {
        const { nombre, edad, especialidad_id = null } = req.body;
        const resultado = await Profesor.create(nombre, edad, especialidad_id);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const updateProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, especialidad_id = null } = req.body;
        const resultado = await Profesor.update(id, nombre, edad, especialidad_id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Profesor");
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const deleteProfesor = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Profesor.remove(id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Profesor");
        }

        res.json({ mensaje: "Profesor eliminado", profesor: resultado.rows[0] });
    } catch (error) {
        sendDbError(res, error);
    }
};

module.exports = {
    getProfesores,
    getProfesor,
    createProfesor,
    updateProfesor,
    deleteProfesor,
};
