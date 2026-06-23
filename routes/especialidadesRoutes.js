const router = require("express").Router();

const {
    getEspecialidades,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad,
} = require("../controllers/especialidadesController");
const validateRequest = require("../middleware/validateRequest");
const validators = require("../validators/especialidadesValidators");

router.get("/", getEspecialidades);
router.post("/", validators.createEspecialidad, validateRequest, createEspecialidad);
router.put("/:id", validators.updateEspecialidad, validateRequest, updateEspecialidad);
router.delete("/:id", validators.deleteEspecialidad, validateRequest, deleteEspecialidad);

module.exports = router;
