import React, { Component } from "react"
import axios from 'axios'


const baseUrl = "http://140.238.190.38:4000/api/";

class PageInicio extends Component {

    state = {
        eventos: []
    }

    listareventos = () => {
        axios({
            method: 'get',
            url: baseUrl + "eventos",
            headers: {},
            data: {}
        })

            .then(response => {
                //console.log(response.data)
                const eventos = response.data
                //console.log(eventos)
                this.setState({ eventos })
            })
    }

    componentDidMount() {
        this.listareventos()
    }

    render() {

        return (

            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Fecha</th>
                        <th scope='col'>Tipo Deporte</th>
                        <th scope='col'>Equipo 1</th>
                        <th scope='col'></th>
                        <th scope='col'></th>
                        <th scope='col'></th>
                        <th scope='col'>Equipo 2</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.eventos.map(evento => {

                            return (
                                <tr id={evento._id}>
                                    <th scope="col">{evento.Fecha}</th>
                                    <th scope='col'>{evento.Tipo_Deporte}</th>
                                    <th scope='col' id={evento.Equipo1}>{evento.Equipo1}</th>
                                    <th scope='col' id={evento.Marcador_Equipo1}>{evento.Marcador_Equipo1}</th>
                                    <th scope='col'>-</th>
                                    <th scope='col' id={evento.Marcador_Equipo2}>{evento.Marcador_Equipo2}</th>
                                    <th scope='col' id={evento.Equipo2}>{evento.Equipo2}</th>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        )
    }

}


export default PageInicio