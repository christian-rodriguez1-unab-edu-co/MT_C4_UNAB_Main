const mongoose=require('mongoose')
const Schema=mongoose.Schema

const usuariosSchema = new Schema({
    Nombre_Completo: {type:String, Trin:true, lowercase:true},
    Username: {type:String, Trin:true, unique:true,lowercase:true},
    Password: {type:String, Trin:true, lowercase:true},
    Rol: {type:Number, default:1},
    Token:{type:String},
    Token_Timestamp:{type:Date},
    Equipos_ID:[{ type: Schema.Types.ObjectId, ref: "equipos" }],
    Deportes_ID:[{ type: Schema.Types.ObjectId, ref: "deportes" }],
    Activo:{type:Boolean, default:true}
})

module.exports=mongoose.model('usuarios',usuariosSchema)