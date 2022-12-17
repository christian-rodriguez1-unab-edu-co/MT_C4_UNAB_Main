const express=require('express')
const authMiddleware = require("../middleware/authMiddleware")
const router=express.Router()
const usuariosController=require('../controllers/usuariosControler')

    //llamado get users
    router.get('/:Username',authMiddleware,usuariosController.list)

    //llamado post users
    router.post('/',authMiddleware,usuariosController.add)

    //llamado put users
    router.put('/:id',authMiddleware,usuariosController.update)

    
    //llamado delete users
    router.delete('/:id',authMiddleware,usuariosController.delete)

    //validar  Token
    //router.post('/token',authMiddleware,usuariosController.tokenval)

    //llamado post login
    router.post('/login',usuariosController.login)

    module.exports=router;


    