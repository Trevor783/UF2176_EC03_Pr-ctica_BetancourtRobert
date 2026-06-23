const pool = require('../config/db');

// 1. alumnos por edad
const alumnosPorEdad = async (edad) => {
  const result = await pool.query(
    'SELECT alumno_id, nombre, email, edad FROM alumnos WHERE edad = $1 ORDER BY alumno_id',
    [edad]
  );
  return result.rows;
};

// 2. rango de edad
const alumnosPorRango = async (min, max) => {
  const result = await pool.query(
    'SELECT alumno_id, nombre, email, edad FROM alumnos WHERE edad >= $1 AND edad <= $2 ORDER BY edad, alumno_id',
    [min, max]
  );
  return result.rows;
};

// 3. cursos top matriculados (SUBQUERY)
const cursosTopMatriculados = async () => {
  const result = await pool.query(`
    SELECT
      c.curso_id,
      c.nombre AS curso,
      COUNT(m.matricula_id)::int AS total_matriculas
    FROM curso c
    JOIN matriculas m ON c.curso_id = m.curso_id
    GROUP BY c.curso_id, c.nombre
    HAVING COUNT(m.matricula_id) = (
      SELECT MAX(total_matriculas)
      FROM (
        SELECT COUNT(*) AS total_matriculas
        FROM matriculas
        GROUP BY curso_id
      ) sub
    )
    ORDER BY c.curso_id
  `);
  return result.rows;
};

// 4. JOIN 2 tablas
const matriculasAlumnoCurso = async () => {
  const result = await pool.query(`
    SELECT 
      m.matricula_id,
      a.nombre AS alumno,
      c.nombre AS curso
    FROM matriculas m
    JOIN alumnos a ON m.alumno_id = a.alumno_id
    JOIN curso c ON m.curso_id = c.curso_id
    ORDER BY m.matricula_id
  `);
  return result.rows;
};

// 5. JOIN 3 tablas
const profesoresCursoEspecialidad = async () => {
  const result = await pool.query(`
    SELECT 
      p.nombre AS profesor,
      c.nombre AS curso,
      e.nombre AS especialidad
    FROM profesores p
    JOIN curso c ON p.profesor_id = c.profesor_id
    JOIN especialidad e ON p.especialidad_id = e.especialidad_id
    ORDER BY p.profesor_id, c.curso_id
  `);
  return result.rows;
};

// 6. GROUP BY
const totalPorCurso = async () => {
  const result = await pool.query(`
    SELECT 
      c.curso_id,
      c.nombre AS curso,
      COUNT(m.alumno_id)::int AS total_matriculas
    FROM curso c
    LEFT JOIN matriculas m ON c.curso_id = m.curso_id
    GROUP BY c.curso_id, c.nombre
    ORDER BY c.curso_id
  `);
  return result.rows;
};

// 7. GROUP BY + HAVING
const cursosMinimo = async (min) => {
  const result = await pool.query(`
    SELECT 
      c.curso_id,
      c.nombre AS curso,
      COUNT(m.matricula_id)::int AS total_matriculas
    FROM curso c
    JOIN matriculas m ON c.curso_id = m.curso_id
    GROUP BY c.curso_id, c.nombre
    HAVING COUNT(m.matricula_id) >= $1
    ORDER BY total_matriculas DESC, c.curso_id
  `, [min]);

  return result.rows;
};

module.exports = {
  alumnosPorEdad,
  alumnosPorRango,
  cursosTopMatriculados,
  matriculasAlumnoCurso,
  profesoresCursoEspecialidad,
  totalPorCurso,
  cursosMinimo
};
