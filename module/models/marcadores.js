const mongoose=require('mongoose')
const Schema=mongoose.Schema

const marcadoresSchema=new Schema({
    Marcador_Equipo1:{type:Number},
    Marcador_Equipo2:{type:Number},
    Usuario_ID:{type:Schema.Types.ObjectId, ref: "usuarios"},
    Evento_ID:{type:Schema.Types.ObjectId, ref: "eventos"},
    Activo:{type:Boolean}
})

module.exports=mongoose.model('marcadores',marcadoresSchema)