const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    Nombre: { type: String, required: true, trim: true},
    Imagen: { type:String,  required:true, trim:true},
    Deporte_ID: {type: mongoose.Schema.Types.ObjectId,ref:"deportes"},
    Activo: { type: Boolean, default:true },
});

module.exports = mongoose.model("equipos", teamSchema);
