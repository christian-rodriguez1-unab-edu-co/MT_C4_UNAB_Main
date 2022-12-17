const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const teamController =  require("../controllers/equiposController");


router.get("/",teamController.readTeam);
router.post("/",authMiddleware,teamController.createTeam);
router.delete("/:id",authMiddleware, teamController.deleteTeam);
router.put("/:id",authMiddleware, teamController.updateTeam);

module.exports=router;