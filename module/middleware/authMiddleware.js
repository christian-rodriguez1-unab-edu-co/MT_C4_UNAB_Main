//const jwt = require("jsonwebtoken");
const usuarios = require('../models/usuarios')

module.exports = async function (req, res, next) {
    const username = req.header("Username");
    const token = req.header("Token");
    const rol = req.header("Rol");
    //    const token = req.header("x-auth-token");
    console.log("init Middleware:" + token);
    if (!token) {
        return res.status(400).json({ msg: "No hay Token" })
    }
    try {
        //        const cifrado = jwt.verify(token, process.env.SECRETA)
        //        req.user = cifrado.user;
        //        next();

        const usuario = await usuarios.find({Username: username, Rol: rol})

        console.log(usuario['0'])

        if (usuario[0].Token == token) {

            //res.json(usuario[0].Token_Timestamp-Date.now())
            if ((Date.now() - usuario[0].Token_Timestamp) < 300000) {
                const update1 = usuarios.findByIdAndUpdate({
                    _id: usuario[0]._id
                }, {
                    Token_Timestamp: Date.now()
                })

                next();

            } else {
                res.status(400).json({ message: "Token expirado" })
            }

        } else {
            res.status(400).json({ message: "Token Invalido" })
        }
        

    } catch (error) {

        res.status(400).json({ msg: "Token no valido" })

    }

}