import React, { Component } from "react"

import axios from 'axios'
import Cookies from 'js-cookie'



const baseUrl = "http://140.238.179.127:4000/api/";

class PageEventos extends Component {
    state = {
        eventos: [],
        deportes: [],
        equipos: [],
        form: {
            Fecha: '',
            Equipo1: '',
            Equipo2: '',
            Marcador_Equipo1: '',
            Marcador_Equipo2: '',
            Tipo_Deporte: ''
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

    newevent = async () => {

        const Rol = Cookies.get('Rol')
        const Token = Cookies.get('Token')
        const Username = Cookies.get('Username')

        axios({
            method: 'post',
            url: baseUrl + "eventos",
            headers: { "Username": Username, "Rol": Rol, "Token": Token },
            data: {
                Fecha: this.state.form.Fecha,
                Equipo1: this.state.form.Equipo1,
                Equipo2: this.state.form.Equipo2,
                Marcador_Equipo1: this.state.form.Marcador_Equipo1,
                Marcador_Equipo2: this.state.form.Marcador_Equipo2,
                Tipo_Deporte: this.state.form.Tipo_Deporte
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

                <h2 colspan="8">Panel de edicion de eventos</h2>

                <table className='table'>

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
                                        <td>{eventos.Marcador_Equipo1}</td>
                                        <td>-</td>
                                        <td>{eventos.Marcador_Equipo2}</td>
                                        <td>{(this.state.equipos.find(equipo => { return equipo._id === eventos.Equipo2 })).Nombre}</td>
                                        <td></td>
                                    </tr>

                                )

                            })

                        }

                        <tr>

                            <td><input type="datetime-local" name="Fecha" onChange={this.handleChange} value={form ? form.Fecha : ''}></input></td>
                            <td>
                                <input list="deportes" name="Tipo_Deporte" onChange={this.handleChange} value={form ? form.Tipo_Deporte : ''} />
                                <datalist id="deportes">
                                    {
                                        this.state.deportes.map(deporte => {
                                            return (
                                                <option value={deporte._id}>{deporte.Nombre}</option>
                                            )
                                        })
                                    }
                                </datalist>

                            </td>
                            <td>
                                <input list="equipos" name="Equipo1" onChange={this.handleChange} value={form ? form.Equipo1 : ''} />
                                <datalist id="equipos">
                                    {
                                        this.state.equipos.map(equipo => {
                                            return (
                                                <option value={equipo._id}>{equipo.Nombre}</option>
                                            )
                                        })
                                    }
                                </datalist>
                            </td>
                            <td>
                                <input type="number" min="0" name="Marcador_Equipo1" onChange={this.handleChange} value={form ? form.Marcador_Equipo1 : ''} />
                            </td>
                            <td>
                                -
                            </td>
                            <td>
                                <input type="number" min="0" name="Marcador_Equipo2" onChange={this.handleChange} value={form ? form.Marcador_Equipo2 : ''} />
                            </td>
                            <td>
                                <input list="equipos" name="Equipo2" onChange={this.handleChange} value={form ? form.Equipo2 : ''} />
                                <datalist id="equipos">
                                    {
                                        this.state.equipos.map(equipo => {
                                            return (
                                                <option value={equipo._id}>{equipo.Nombre}</option>
                                            )
                                        })
                                    }
                                </datalist>


                            </td>

                            <td>
                                <input type="submit" value="Agregar" onClick={() => this.newevent()} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}




export default PageEventos