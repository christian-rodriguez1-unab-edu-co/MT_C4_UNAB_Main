import React, { Component } from "react"
import axios from 'axios'


const baseUrl = "http://140.238.179.127:4000/api/";

class PageInicio extends Component {

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

                </tbody>
            </table>

        )
    }

}


export default PageInicio