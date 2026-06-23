const Alumno = require("../models/Alumno");
const { sendDbError, sendNotFound } = require("./controllerUtils");

const getAlumnos = async (req, res) => {
    try {
        const resultado = await Alumno.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createAlumno = async (req, res) => {
    try {
        const { nombre, email, edad } = req.body;
        const resultado = await Alumno.create(nombre, email, edad);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const updateAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, edad } = req.body;
        const resultado = await Alumno.update(id, nombre, email, edad);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Alumno");
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        sendDbError(res, error);
    }
};

const deleteAlumno = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Alumno.remove(id);

        if (resultado.rowCount === 0) {
            return sendNotFound(res, "Alumno");
        }

        res.json({ mensaje: "Alumno eliminado", alumno: resultado.rows[0] });
    } catch (error) {
        sendDbError(res, error);
    }
};



module.exports = {
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
};
