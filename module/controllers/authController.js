const User = require("../models/usuarios");
//const bcryptjs = require("bcryptjs");
//const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

exports.authenticateUser = async(req,res) =>{

    const{password, email} = req.body;
    try {
        
        let user = await User.findOne({email});
        if (!user){
            return res.status(400).json({msg:"El usuario no existe"});

        }
        const passwordCorrect = await bcryptjs.compare(password,user.password);

        if(!passwordCorrect){
            return res.status(404).json({msg:"Password incorrecto"});
        }
        let payload = {
            user:{id:user.id},
        };
        
        jwt.sign(
            payload,
            process.env.SECRETA,{
                expiresIn:'15d',//15 días

            },
            
            (error, token)=>{
                if(error)throw error;
                res.json({token});
            } 
        );
        console.log("Permitir Ingresar")
    } catch (error) {
        console.log(error);
        
    } 
}

exports.authUser = async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        res.json({user})
    } catch (error) {
        res.status(403).json({msg:"Error de autenticación"})
    }
} 