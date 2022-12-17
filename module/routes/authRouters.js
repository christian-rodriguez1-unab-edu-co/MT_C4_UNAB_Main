const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

//* autenticar rutas
router.post(
    "/",
    authController.authenticateUser
);
//* 
router.get("/", authMiddleware, authController.authUser
);
module.exports=router;




