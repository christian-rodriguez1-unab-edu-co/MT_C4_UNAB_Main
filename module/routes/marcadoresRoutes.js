const express=require('express')
const authMiddleware = require("../middleware/authMiddleware")
const router=express.Router()
const marcadoresController=require('../controllers/marcadoresController')

    //llamado get de marcadores
    router.get('/',authMiddleware, marcadoresController.list)
    
    //llamado post de marcadores
    router.post('/',authMiddleware, marcadoresController.add)

    //llamado put de marcadores
    router.put('/:id',authMiddleware, marcadoresController.update)

    //llamado delete de marcadores
    router.delete('/:id',authMiddleware, marcadoresController.delete)

    //llamado de marcadores por usuarios
    router.get('/usuario/:id',authMiddleware, marcadoresController.listbyuser)

    module.exports=router
