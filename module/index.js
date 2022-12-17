const conectDB = require("./config/db");
const express = require("express");
const marcadoresRoutes = require("./routes/marcadoresRoutes")
const eventosRoutes = require("./routes/eventosRoutes")
const equiposRoutes = require("./routes/equiposRoutes")
const deportesRoutes = require("./routes/deportesRoutes")
const usuariosRoutes = require("./routes/usuariosRoutes")
//const authRouters = require("./routers/authRouters")

const cors = require("cors");

conectDB();

const app = express();

app.use(cors());

app.use(express.json({ extended: true }));

app.use("/api/marcadores", marcadoresRoutes);
app.use("/api/eventos", eventosRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/deportes", deportesRoutes);
app.use("/api/usuarios", usuariosRoutes);
//app.use("/api/auth", authRouters);

app.listen(4000, () => {
    console.log("SERVIDOR  CORRIENDO EN EL PUERTO 4000 ");
});