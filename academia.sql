-- DDL

CREATE TABLE profesores (
    profesor_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT NOT NULL,
    edad SMALLINT CHECK (edad >= 0 AND edad < 150),
    especialidad_id INT
);

CREATE TABLE curso (
    curso_id SERIAL PRIMARY KEY,
    nombre TEXT,
    horas INTEGER,
    profesor_id INTEGER,
    CONSTRAINT fk_profesor FOREIGN KEY (profesor_id)
        REFERENCES profesores(profesor_id)
);

CREATE TABLE especialidad (
    especialidad_id SERIAL PRIMARY KEY,
    nombre TEXT,
    profesor_id INTEGER
);

ALTER TABLE especialidad
ADD CONSTRAINT fk_profesor_especialidad
FOREIGN KEY (profesor_id) REFERENCES profesores(profesor_id);

CREATE TABLE alumnos (
    alumno_id SERIAL PRIMARY KEY,
    nombre TEXT,
    email VARCHAR(50) UNIQUE,
    edad SMALLINT CHECK (edad >= 0 AND edad < 150)
);

CREATE TABLE matriculas (
    matricula_id SERIAL PRIMARY KEY,
    alumno_id INTEGER NOT NULL,
    curso_id INTEGER NOT NULL,
    fecha_matricula DATE NOT NULL,
    CONSTRAINT fk_curso2 FOREIGN KEY (curso_id)
        REFERENCES curso(curso_id),
    CONSTRAINT fk_alumno2 FOREIGN KEY (alumno_id)
        REFERENCES alumnos(alumno_id)
);

INSERT INTO profesores (nombre, edad, especialidad_id) VALUES
('Ana Garcia', 35, NULL),
('Juan Perez', 42, NULL),
('Laura Martinez', 29, NULL),
('Carlos Sanchez', 50, NULL),
('Marta Lopez', 38, NULL),
('David Ruiz', 45, NULL),
('Elena Torres', 33, NULL),
('Javier Moreno', 40, NULL),
('Patricia Romero', 31, NULL),
('Sergio Navarro', 48, NULL);

INSERT INTO especialidad (nombre, profesor_id) VALUES
('Desarrollo Web', 1),
('Bases de Datos', 2),
('Python', 3),
('Java', 4),
('JavaScript', 5),
('DevOps', 6),
('Ciberseguridad', 7),
('Inteligencia Artificial', 8),
('UX/UI', 9),
('Cloud Computing', 10);

UPDATE profesores SET especialidad_id = 1 WHERE profesor_id = 1;
UPDATE profesores SET especialidad_id = 2 WHERE profesor_id = 2;
UPDATE profesores SET especialidad_id = 3 WHERE profesor_id = 3;
UPDATE profesores SET especialidad_id = 4 WHERE profesor_id = 4;
UPDATE profesores SET especialidad_id = 5 WHERE profesor_id = 5;
UPDATE profesores SET especialidad_id = 6 WHERE profesor_id = 6;
UPDATE profesores SET especialidad_id = 7 WHERE profesor_id = 7;
UPDATE profesores SET especialidad_id = 8 WHERE profesor_id = 8;
UPDATE profesores SET especialidad_id = 9 WHERE profesor_id = 9;
UPDATE profesores SET especialidad_id = 10 WHERE profesor_id = 10;

INSERT INTO curso (nombre, horas, profesor_id) VALUES
('HTML y CSS', 120, 1),
('PostgreSQL', 150, 2),
('Python Basico', 180, 3),
('Java Orientado a Objetos', 200, 4),
('JavaScript Moderno', 160, 5),
('Docker y Kubernetes', 140, 6),
('Hacking Etico', 170, 7),
('Machine Learning', 220, 8),
('Diseno UX', 100, 9),
('AWS Fundamentals', 130, 10);

INSERT INTO alumnos (nombre, email, edad) VALUES
('Oscar Burgos', 'oscar@gmail.com', 20),
('Lucia Fernandez', 'lucia@gmail.com', 18),
('Pedro Gomez', 'pedro@gmail.com', 22),
('Sara Martin', 'sara@gmail.com', 25),
('Miguel Diaz', 'miguel@gmail.com', 19),
('Claudia Ramos', 'claudia@gmail.com', 20),
('Andres Vega', 'andres@gmail.com', 27),
('Natalia Cruz', 'natalia@gmail.com', 24),
('Ivan Herrera', 'ivan@gmail.com', 21),
('Beatriz Leon', 'beatriz@gmail.com', 23);

INSERT INTO matriculas (alumno_id, curso_id, fecha_matricula) VALUES
(1, 1, '2025-09-01'),
(2, 2, '2025-09-02'),
(3, 3, '2025-09-03'),
(4, 4, '2025-09-04'),
(5, 5, '2025-09-05'),
(6, 6, '2025-09-06'),
(7, 7, '2025-09-07'),
(8, 8, '2025-09-08'),
(9, 9, '2025-09-09'),
(10, 10, '2025-09-10');
