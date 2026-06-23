const pool = require("../config/db");

const Especialidad = {
    findAll: () =>
        pool.query(`
            SELECT e.*, p.nombre AS profesor
            FROM especialidad e
            LEFT JOIN profesores p ON e.profesor_id = p.profesor_id
            ORDER BY e.especialidad_id
        `),

    create: (nombre, profesor_id) =>
        pool.query(
            `INSERT INTO especialidad (nombre, profesor_id) VALUES ($1, $2) RETURNING *`,
            [nombre, profesor_id]
        ),

    update: (id, nombre, profesor_id) =>
        pool.query(
            `UPDATE especialidad SET nombre = $1, profesor_id = $2 WHERE especialidad_id = $3 RETURNING *`,
            [nombre, profesor_id, id]
        ),

    remove: (id) =>
        pool.query("DELETE FROM especialidad WHERE especialidad_id = $1 RETURNING *", [id]),
};

module.exports = Especialidad;
