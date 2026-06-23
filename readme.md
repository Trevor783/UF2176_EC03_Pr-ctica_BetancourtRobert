# Academia API

API REST con Express, PostgreSQL, Docker y consultas SQL para el examen.

## 1. Entrar en la carpeta correcta

Si estas en la carpeta exterior `academia-main (examen)`, entra primero en el proyecto real:

```powershell
cd "C:\Users\Matins\Documents\ExamenSQL\academia-main (examen)\academia-main"
```

## 2. Levantar la base de datos

```powershell
docker compose up -d
```

Esto levanta:

- PostgreSQL en `localhost:5433`
- pgAdmin en `http://localhost:5051`

Credenciales de pgAdmin:

```txt
Email: admin@admin.com
Password: root
```

Datos de PostgreSQL:

```txt
Host: localhost
Port: 5433
Database: academia
User: quiz_user
Password: quiz_pass
```

## 3. Instalar dependencias

Solo hace falta la primera vez:

```powershell
npm install
```

## 4. Ejecutar la API

```powershell
npm start
```

La API queda disponible en:

```txt
http://localhost:3000
```

Comprobar que funciona:

```txt
GET http://localhost:3000/health
```

## Scripts disponibles

```powershell
npm start
```

Ejecuta `node app.js`.

```powershell
npm run dev
```

Ejecuta `nodemon app.js` para desarrollo.

## Endpoints CRUD

### Profesores

```txt
GET    /api/profesores
GET    /api/profesores/:id
POST   /api/profesores
PUT    /api/profesores/:id
DELETE /api/profesores/:id
```

Ejemplo body:

```json
{
  "nombre": "Pedro Garcia",
  "edad": 40,
  "especialidad_id": 3
}
```

### Alumnos

```txt
GET    /api/alumnos
POST   /api/alumnos
PUT    /api/alumnos/:id
DELETE /api/alumnos/:id
```

Ejemplo body:

```json
{
  "nombre": "Maria Perez",
  "email": "maria@gmail.com",
  "edad": 20
}
```

### Cursos

```txt
GET    /api/cursos
POST   /api/cursos
PUT    /api/cursos/:id
DELETE /api/cursos/:id
```

Ejemplo body:

```json
{
  "nombre": "Node.js Basico",
  "horas": 120,
  "profesor_id": 1
}
```

### Especialidades

```txt
GET    /api/especialidades
POST   /api/especialidades
PUT    /api/especialidades/:id
DELETE /api/especialidades/:id
```

Ejemplo body:

```json
{
  "nombre": "Backend",
  "profesor_id": 1
}
```

### Matriculas

```txt
GET    /api/matriculas
POST   /api/matriculas
PUT    /api/matriculas/:id
DELETE /api/matriculas/:id
```

Ejemplo body:

```json
{
  "alumno_id": 1,
  "curso_id": 3,
  "fecha_matricula": "2026-06-23"
}
```

## Endpoints de consultas SQL

### 1. WHERE simple

```txt
GET /api/consultas/alumnos/por-edad?edad=20
```

Lista alumnos con edad igual al parametro `edad`.

SQL usado:

```sql
SELECT alumno_id, nombre, email, edad
FROM alumnos
WHERE edad = $1
ORDER BY alumno_id;
```

Ejemplo de response:

```json
[
  {
    "alumno_id": 1,
    "nombre": "Oscar Burgos",
    "email": "oscar@gmail.com",
    "edad": 20
  }
]
```

### 2. WHERE con dos condiciones

```txt
GET /api/consultas/alumnos/rango?min=18&max=25
```

Lista alumnos con edad entre `min` y `max`.

SQL usado:

```sql
SELECT alumno_id, nombre, email, edad
FROM alumnos
WHERE edad >= $1 AND edad <= $2
ORDER BY edad, alumno_id;
```

Ejemplo de response:

```json
[
  {
    "alumno_id": 2,
    "nombre": "Lucia Fernandez",
    "email": "lucia@gmail.com",
    "edad": 18
  }
]
```

### 3. Subconsulta

```txt
GET /api/consultas/cursos/top-matriculados
```

Obtiene el curso o cursos con el maximo numero de matriculas.

SQL usado:

```sql
SELECT c.curso_id, c.nombre AS curso, COUNT(m.matricula_id)::int AS total_matriculas
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
ORDER BY c.curso_id;
```

Ejemplo de response:

```json
[
  {
    "curso_id": 1,
    "curso": "HTML y CSS",
    "total_matriculas": 1
  }
]
```

### 4. JOIN de 2 tablas

```txt
GET /api/consultas/matriculas/alumno-curso
```

Lista matriculas mostrando alumno y curso.

SQL usado:

```sql
SELECT m.matricula_id, a.nombre AS alumno, c.nombre AS curso
FROM matriculas m
JOIN alumnos a ON m.alumno_id = a.alumno_id
JOIN curso c ON m.curso_id = c.curso_id
ORDER BY m.matricula_id;
```

Ejemplo de response:

```json
[
  {
    "matricula_id": 1,
    "alumno": "Oscar Burgos",
    "curso": "HTML y CSS"
  }
]
```

### 5. JOIN de 3 tablas

```txt
GET /api/consultas/profesores/curso-especialidad
```

Lista profesor, curso y especialidad.

SQL usado:

```sql
SELECT p.nombre AS profesor, c.nombre AS curso, e.nombre AS especialidad
FROM profesores p
JOIN curso c ON p.profesor_id = c.profesor_id
JOIN especialidad e ON p.especialidad_id = e.especialidad_id
ORDER BY p.profesor_id, c.curso_id;
```

Ejemplo de response:

```json
[
  {
    "profesor": "Ana Garcia",
    "curso": "HTML y CSS",
    "especialidad": "Desarrollo Web"
  }
]
```

### 6. GROUP BY

```txt
GET /api/consultas/matriculas/total-por-curso
```

Muestra cuantas matriculas hay por curso.

SQL usado:

```sql
SELECT c.curso_id, c.nombre AS curso, COUNT(m.alumno_id)::int AS total_matriculas
FROM curso c
LEFT JOIN matriculas m ON c.curso_id = m.curso_id
GROUP BY c.curso_id, c.nombre
ORDER BY c.curso_id;
```

Ejemplo de response:

```json
[
  {
    "curso_id": 1,
    "curso": "HTML y CSS",
    "total_matriculas": 1
  }
]
```

### 7. GROUP BY + HAVING

```txt
GET /api/consultas/matriculas/cursos-con-minimo?min=5
```

Lista cursos que tienen al menos `min` matriculas.

SQL usado:

```sql
SELECT c.curso_id, c.nombre AS curso, COUNT(m.matricula_id)::int AS total_matriculas
FROM curso c
JOIN matriculas m ON c.curso_id = m.curso_id
GROUP BY c.curso_id, c.nombre
HAVING COUNT(m.matricula_id) >= $1
ORDER BY total_matriculas DESC, c.curso_id;
```

Ejemplo de response:

```json
[
  {
    "curso_id": 1,
    "curso": "HTML y CSS",
    "total_matriculas": 1
  }
]
```

## Ejemplos con PowerShell

Crear alumno:

```powershell
Invoke-RestMethod "http://localhost:3000/api/alumnos" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"nombre":"Maria Perez","email":"maria@gmail.com","edad":20}'
```

Actualizar alumno:

```powershell
Invoke-RestMethod "http://localhost:3000/api/alumnos/1" `
  -Method Put `
  -ContentType "application/json" `
  -Body '{"nombre":"Maria Editada","email":"maria.editada@gmail.com","edad":21}'
```

Eliminar alumno:

```powershell
Invoke-RestMethod "http://localhost:3000/api/alumnos/1" -Method Delete
```

## Validaciones

Las rutas `POST`, `PUT` y `DELETE` usan validadores con `express-validator`.

Si los datos son incorrectos, la API responde con estado `400` y un JSON parecido a:

```json
{
  "mensaje": "Datos invalidos",
  "errores": [
    {
      "campo": "email",
      "mensaje": "El email debe ser valido"
    }
  ]
}
```

## Comandos utiles

Ver contenedores:

```powershell
docker compose ps
```

Parar contenedores:

```powershell
docker compose down
```

Recrear la base de datos desde cero:

```powershell
docker compose down -v
docker compose up -d
```

Usa `down -v` solo si quieres borrar los datos actuales y volver a cargar `academia.sql`.
