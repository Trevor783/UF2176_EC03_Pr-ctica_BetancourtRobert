const router = require("express").Router();

const {
    getCursos,
    createCurso,
    updateCurso,
    deleteCurso,
} = require("../controllers/cursosController");
const validateRequest = require("../middleware/validateRequest");
const validators = require("../validators/cursosValidators");

router.get("/", getCursos);
router.post("/", validators.createCurso, validateRequest, createCurso);
router.put("/:id", validators.updateCurso, validateRequest, updateCurso);
router.delete("/:id", validators.deleteCurso, validateRequest, deleteCurso);

module.exports = router;
