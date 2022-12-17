const mongoose=require('mongoose')
const Schema=mongoose.Schema

const eventoSchema=new Schema({
    Fecha:{type: Date,Trim:true },
    Equipo1:{type:Schema.Types.ObjectId, ref: "equipos",Trim:true},
    Equipo2:{type:Schema.Types.ObjectId, ref: "equipos",Trim:true},
    Marcador_Equipo1:{type:Number,Trim:true},
    Marcador_Equipo2:{type:Number,Trim:true},
    Tipo_Deporte:{type:Schema.Types.ObjectId, ref: "deportes",Trim:true},
    Activo:{type:Boolean,Trim:true},

  
})

module.exports=mongoose.model('eventos',eventoSchema)