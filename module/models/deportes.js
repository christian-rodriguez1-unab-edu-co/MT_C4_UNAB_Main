const mongoose = require("mongoose");

const deportSchema = mongoose.Schema({
    Nombre: { type: String, required: true, trim: true, unique: true },
    Activo: { type: Boolean, required: true, trim: true },
});

module.exports = mongoose.model("deportes", deportSchema);

