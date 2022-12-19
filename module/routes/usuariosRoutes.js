const express=require('express')
const authMiddleware = require("../middleware/authMiddleware")
const router=express.Router()
const usuariosController=require('../controllers/usuariosControler')

    //llamado get user
    router.get('/:username',authMiddleware,usuariosController.findone)

    //llamado post user
    router.post('/',authMiddleware,usuariosController.add)

    //llamado put user
    router.put('/:id',authMiddleware,usuariosController.update)

    
    //llamado delete user
    router.delete('/:id',authMiddleware,usuariosController.delete)

    //validar  Token
    //router.post('/token',authMiddleware,usuariosController.tokenval)

    //llamado post login
    router.post('/login',usuariosController.login)

    module.exports=router;


    