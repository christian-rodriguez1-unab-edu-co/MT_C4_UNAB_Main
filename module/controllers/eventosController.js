const eventos = require('../models/eventos')

//primera accion listar todos
exports.list = async (req, res) => {

    try {

        const colEventos = await eventos.find({})
        res.json(colEventos)
    } catch (error) {

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion ingresar todos
exports.add=async(req,res)=>{

    const event=new eventos(req.body)

        try{

            await event.save()
            res.json({message:'nuevo evento agregado'})

        }catch(error){
            console.log(error)
            res.send(error)
            next()
        }
}

//primera accion actualizacion todos
exports.update = async (req, res, next) => {

    try {

        const event = await eventos.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.json({ message: 'eventos actualizado' })
    } catch (error) {

        console.log(error)
        res.send(error)
        next()
    }
}

//primera accion eliminacion todos
exports.delete = async (req, res, next) => {

    try {

        const event = await eventos.findByIdAndDelete(
            { _id: req.params.id }
        )
        res.json({ message: 'eventos eliminado' })
    } catch (error) {

        console.log(error)
        res.send(error)
        next()
    }
}


//Listar eventos por deporte

exports.listbysport = async (req, res) => {
    try {
        const colEventos = await eventos.find({ eventos_ID: req.params.id })
        res.json(colEventos)
    } catch (error) {
        console.log(error)

        res.send(error)
        next()

    }

}

//primera accion actualizacion de marcador
exports.updatescore = async (req, res, next) => {

    try {

        const event = await eventos.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        res.json({ message: 'marcador actualizado' })
    } catch (error) {

        console.log(error)
        res.send(error)
        next()
    }
}