import React, { Component } from "react"

import axios from 'axios'
import Cookies from 'js-cookie'
import { Button } from "bootstrap";



const baseUrl = "http://140.238.190.38:4000/api/";

class PageMarcadores extends Component {
    state = {
        eventos: [],
        deportes: [],
        equipos: [],
        form: {
            Evento_ID: '',
            Marcador_Equipo1: '',
            Marcador_Equipo2: '',
        }

    }

    handleChange = async e => {
        e.persist();
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form);
    }


    listar = () => {

        const deportes = axios({
            method: 'get',
            url: baseUrl + "deportes",
            headers: {},
            data: {}
        })

        const equipos = axios({
            method: 'get',
            url: baseUrl + "equipos",
            headers: {},
            data: {}
        })

        const eventos = axios({
            method: 'get',
            url: baseUrl + "eventos",
            headers: {},
            data: {}
        })


        axios.all([equipos, deportes, eventos])
            .then(
                axios.spread((...res) => {

                    console.log(res)

                    const equipos = res[0].data
                    const deportes = res[1].data
                    const eventos = res[2].data

                    this.setState({ equipos: equipos, deportes: deportes, eventos: eventos })
                })
            )
            .catch(errors => { console.log(errors) })
    }


    componentDidMount() {

        this.listar()

    }

    guardar = () => {

        const Rol = Cookies.get('Rol')
        const Token = Cookies.get('Token')
        const Username = Cookies.get('Username')

        axios({
            method: 'post',
            url: baseUrl + "maarcadores",
            headers: { "Username": Username, "Rol": Rol, "Token": Token },
            data: {
                Evento_ID: this.state.form.Evento_ID,
                Equipo1: this.state.form.Equipo1,
                Equipo2: this.state.form.Equipo2,
                Usuario_ID: Username
            }
        })

            .then(response => {
                console.log(response.data)

            }).catch(error => {
                console.log(error.message);
            })
    }



    render() {

        const form = this.state.form

        console.log(this.state)
        return (
            <div>
                <h2>Panel de registro de Marcadores</h2>
                <table className="table">
                    <thead>
                        <th>Fecha y hora</th>
                        <th>Deporte</th>
                        <th>Nombre Equipo 1</th>
                        <th>Marcador Equipo 1</th>
                        <th></th>
                        <th>Marcador Equipo 2</th>
                        <th>Nombre Equipo 2</th>
                        <th></th>
                    </thead>
                    <tbody>

                        {

                            this.state.eventos.map(eventos => {

                                return (

                                    <tr id={eventos._id}>
                                        <td>{eventos.Fecha}</td>
                                        <td>{(this.state.deportes.find(deporte => { return deporte._id === eventos.Tipo_Deporte })).Nombre}</td>
                                        <td>{(this.state.equipos.find(equipo => { return equipo._id === eventos.Equipo1 })).Nombre}</td>
                                        <td><input type="number" min="0" /></td>
                                        <td>{eventos.Marcador_Equipo1}-{eventos.Marcador_Equipo2}</td>
                                        <td><input type="number" min="0" /></td>
                                        <td>{(this.state.equipos.find(equipo => { return equipo._id === eventos.Equipo2 })).Nombre}</td>
                                        <td><input type="submit" value="Guardar" onClick={() => this.guardar()} /></td>
                                    </tr>

                                )

                            })

                        }
                    </tbody>
                </table>
            </div>
        )
    }
}




export default PageMarcadores