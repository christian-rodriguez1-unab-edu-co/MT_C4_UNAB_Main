const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const deportController = require ("../controllers/deportesController");


router.get("/", deportController.readDeport);
router.post("/",authMiddleware, deportController.createDeport);
router.delete("/:id",authMiddleware, deportController.deleteDeport);
router.put("/:id",authMiddleware, deportController.updateDeport);

module.exports=router;