const Team = require("../models/equipos");

exports.readTeam = async (req, res) => {
    //res.json({ msg: "ejecuto leer equipo" });

    try {
        const team = await Team.find();
        res.json(team);

    } catch (error) {
        console.log(error);
    }
}

/**************************************************************************** */
exports.createTeam = async (req, res) => {
    const { deporteId } = req.body;
    console.log(deporteId);
    try {
        const deportencontrado = await deport.findById(deporteId);
        if (!deportencontrado) {
            return res.status(404).json({ msg: "Deporte no encontrado" });

        }
        const team = new Team(req.body);
        team.save();
        res.json(team);

    } catch (error) {
        console.log(error);
    }
}
/*********************************************************************************** */

exports.updateTeam = async (req, res) => {
    
    const { id } = req.params;
    const team = await Team.findById(id);

    if (!team) {
        return res.status(400).json({ msg: "Equipo no encontrado" });
    }

    team.nombre = req.body.nombre || team.nombre;
    team.imagen = req.body.imagen || team.imagen;
    team.activo = req.body.activo || team.activo
    team.save();
    res.json({ team });
}

/******************************************************************************/

exports.deleteTeam = async (req, res) => {
    try {
        await Team.deleteOne({ _id: req.params.id });
        res.json({ msg: "Equipo eliminado" })
    } catch (error) {
        console.log(error);
    }
}
