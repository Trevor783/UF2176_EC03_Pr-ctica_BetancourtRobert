const router = require("express").Router();

const {
    getMatriculas,
    createMatricula,
    updateMatricula,
    deleteMatricula,
} = require("../controllers/matriculasController");
const validateRequest = require("../middleware/validateRequest");
const validators = require("../validators/matriculasValidators");

router.get("/", getMatriculas);
router.post("/", validators.createMatricula, validateRequest, createMatricula);
router.put("/:id", validators.updateMatricula, validateRequest, updateMatricula);
router.delete("/:id", validators.deleteMatricula, validateRequest, deleteMatricula);

module.exports = router;
