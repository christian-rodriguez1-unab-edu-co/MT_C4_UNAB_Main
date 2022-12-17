const Deports = require("../models/deportes");

        // "req" es lo que podemos leer desde postman
        // "res" es lo que enviamos hacia postman o hacia nuestro front
 exports.readDeport = async (req, res) => {
       
            try {
                const deport = await Deports.find({});
                res.json({ deport });
        
            } catch (error) {
                console.log(error);
            }
        }

 /************************************************************** */      
 exports.createDeport = async (req, res) => {
    
    try {
        const deport = new Deports(req.body);
        deport.save();
        res.json(deport);

    } catch (error) {
        console.log(error);
    }
}
/****************************************************** */

exports.updateDeport = async (req, res) => {
   
    const { id } = req.params;
    const deport = await Deports.findById(id);

    if(!deport){
        return res.status(400).json({ msg: "Deporte no encontrado"});
    }

//    if(deport.creador.toString()!== req.user.id.toString()){
//        return res.status(400).json({ msg: "Acción no valida para este usuario"});
//    }

    deport.nombre = req.body.nombre || deport.nombre;
    deport.save();
    res.json({deport});
    
}
/********************************************************* */

exports.deleteDeport = async (req, res) => {
    // res.json({ msg: "ejecuto borrar categoria" });

    try {
        await Deports.deleteOne({ _id: req.params.id });
        res.json({ msg: "Deporte eliminado" })


    } catch (error) {
        console.log(error);
    }
}