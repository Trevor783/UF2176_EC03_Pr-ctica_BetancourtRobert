const pool = require("../config/db");

const Alumno = {
    findAll: () =>
        pool.query("SELECT * FROM alumnos ORDER BY alumno_id"),

    create: (nombre, email, edad) =>
        pool.query(
            `INSERT INTO alumnos (nombre, email, edad) VALUES ($1, $2, $3) RETURNING *`,
            [nombre, email, edad]
        ),

    update: (id, nombre, email, edad) =>
        pool.query(
            `UPDATE alumnos SET nombre = $1, email = $2, edad = $3 WHERE alumno_id = $4 RETURNING *`,
            [nombre, email, edad, id]
        ),

    remove: (id) =>
        pool.query("DELETE FROM alumnos WHERE alumno_id = $1 RETURNING *", [id]),
};

module.exports = Alumno;
