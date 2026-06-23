const router = require("express").Router();

const {
    getProfesores,
    getProfesor,
    createProfesor,
    updateProfesor,
    deleteProfesor,
} = require("../controllers/profesoresController");
const validateRequest = require("../middleware/validateRequest");
const validators = require("../validators/profesoresValidators");

router.get("/", getProfesores);
router.get("/:id", validators.getProfesor, validateRequest, getProfesor);
router.post("/", validators.createProfesor, validateRequest, createProfesor);
router.put("/:id", validators.updateProfesor, validateRequest, updateProfesor);
router.delete("/:id", validators.deleteProfesor, validateRequest, deleteProfesor);
module.exports = router;
