const mongoose = require("mongoose");

const conectDB = async () => {
    try {

        const connection = await mongoose.connect(
            'mongodb+srv://MTC4MarcadoresDeportivosUNAB:xS%5E5j6C19ppI@cluster0.yvgbphz.mongodb.net/MarcadoresDeportivos',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`mogodb conectado en: ${url}`);


    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1);
    }

}
module.exports = conectDB;

