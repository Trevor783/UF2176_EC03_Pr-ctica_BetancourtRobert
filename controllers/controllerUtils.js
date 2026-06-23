const sendDbError = (res, error) => {
    if (error.code === "23505") {
        return res.status(409).json({ mensaje: "Ya existe un registro con esos datos" });
    }

    if (error.code === "23503") {
        return res.status(409).json({
            mensaje: "No se puede completar la operacion porque hay registros relacionados",
        });
    }

    return res.status(500).json({ mensaje: error.message });
};

const sendNotFound = (res, recurso) =>
    res.status(404).json({ mensaje: `${recurso} no encontrado` });

module.exports = {
    sendDbError,
    sendNotFound,
};
