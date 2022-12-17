const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true},
    imagen: { type:String,  required:true, trim:true},
    deporteId: {type: mongoose.Schema.Types.ObjectId,ref:"deportes"},
    activo: { type: Boolean, required: true, trim: true },
});

module.exports = mongoose.model("equipos", teamSchema);
