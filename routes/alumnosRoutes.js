const router = require("express").Router();

const {
    getAlumnos,
    createAlumno,
    updateAlumno,
    deleteAlumno,
} = require("../controllers/alumnosController");
const validateRequest = require("../middleware/validateRequest");
const validators = require("../validators/alumnosValidators");

router.get("/", getAlumnos);
router.post("/", validators.createAlumno, validateRequest, createAlumno);
router.put("/:id", validators.updateAlumno, validateRequest, updateAlumno);
router.delete("/:id", validators.deleteAlumno, validateRequest, deleteAlumno);

module.exports = router;
