const express=require('express')
const authMiddleware = require("../middleware/authMiddleware");
const router=express.Router()
const eventosController=require('../controllers/eventosController')

    //llamado get de eventos
    router.get('/',eventosController.list)
    
    //llamado post de eventos
    router.post('/',authMiddleware,eventosController.add)

    //llamado put de eventos
    router.put('/:id',authMiddleware,eventosController.update)

    //llamado delete de eventos
    router.delete('/:id',authMiddleware,eventosController.delete)

    //llamado eventos por deportes
    router.get('/deporte/:id',authMiddleware,eventosController.listbysport)
    
    //llamado put de marcador
    router.put('/marcador/:id',authMiddleware,eventosController.updatescore)

    module.exports=router;
