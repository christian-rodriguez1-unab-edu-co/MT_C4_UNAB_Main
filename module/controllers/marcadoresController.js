const marcadores=require('../models/marcadores')

//primera accion listar todos
exports.list=async(req,res)=>{

    try{
        const colMarcadores=await marcadores.find({})
        res.json(colMarcadores)
    }catch(error){
        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion ingresar todos
exports.add=async(req,res)=>{
    const marcador=new marcadores(req.body)
        try{
       
            await marcador.save()
            res.json({message:'nuevo marcador agregado'})
        }catch(error){
    
            console.log(error)
            res.send(error)
            next()
        }
}

//primera accion actualizacion todos
exports.update=async(req,res,next)=>{
    
    try{
                  
        const marcador=await marcadores.findOneAndUpdate(
            {_id:req.params.id},
            req.body, 
            {new:true}
        )

        if(!marcador){
            return res.status(400).json({ msg: "marcador no encontrado"});
        }

        res.json({message:'marcador actualizado',deport})
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion eliminacion todos
exports.delete=async(req,res,next)=>{
    
    try{
              
        const marcador=await marcadores.findByIdAndDelete(
            {_id:req.params.id}        
        )
        res.json({message:'marcador eliminado'})
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion listar por usuario
exports.listbyuser=async(req,res)=>{

    try{
   
        const colMarcadores=await marcadores.find({Usuario_ID:req.params.id})
        res.json(colMarcadores)
    }catch(error){

        console.log(error)
        res.send(error)
        next()
    }
}