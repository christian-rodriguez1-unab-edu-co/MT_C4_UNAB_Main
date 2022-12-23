const mongoose = require("mongoose");

const deportSchema = mongoose.Schema({
    Nombre: { type: String, required: true, trim: true, unique: true },
    Activo: { type: Boolean, default:true },
});

module.exports = mongoose.model("deportes", deportSchema);

