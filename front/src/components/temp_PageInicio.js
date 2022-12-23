import React, { Component } from "react"
import axios from 'axios'


const baseUrl = "http://140.238.190.38:4000/api/";

class PageInicio extends Component {

    state = {
        deportes: [],
        eventos: []
    }

    group = (data, column) => {
        //console.log(data, column)
        var generatedData = {};
        for (var i in data) {
            //console.log(i)
            var dt = data[i];
            //console.log(dt)
            var key = dt[column];
            if (!(key in generatedData)) {
                generatedData[key] = [];
            }
            generatedData[key].push(dt);
        }
        console.log(generatedData)
        return generatedData;
    }

    listardeportes = () => {
        axios({
            method: 'get',
            url: baseUrl + "deportes",
            headers: {},
            data: {}
        })

            .then(response => {
                //console.log(response.data)
                const deportes = response.data
                const eventos = this.state.eventos
                //console.log(deportes)
                this.setState({ deportes, eventos })
            })
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
                const deportes = this.state.deportes
                const eventosall = response.data
                const eventos = this.group(eventosall, "Tipo_Deporte")
                console.log(eventos)
                this.setState({ eventos })
            })
    }

    componentDidMount() {
        this.listardeportes()
        this.listareventos()
    }

    render() {

        return (

            <div className="row">
                <div className="col-3">
                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link" href="">Deportes</a>
                            <nav className="nav nav-pills flex-column">
                                {
                                    this.state.deportes.map(deporte => {
                                        return (
                                            <a className="nav-link ms-3 my-1" href={"#" + deporte._id}>{deporte.Nombre}</a>
                                        )
                                    })
                                }
                            </nav>
                        </nav>
                    </nav>
                </div>

                <div className="col-9">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" className="scrollspy-example-2" tabindex="0">
                        {console.log(this.state.eventos)}
                        {
                            this.state.deportes.map(deporte => {
                                return (
                                    <div id={deporte._id}>
                                        <h4>{deporte.Nombre}</h4>



                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>



        )
    }

}


export default PageInicio