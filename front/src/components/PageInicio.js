import React, { Component } from "react"
import axios from 'axios'


const baseUrl = "http://140.238.190.38:4000/api/";

class PageInicio extends Component {

    state = {
        deportes: [],
        eventos: []
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
                console.log(deportes)
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
                const eventos = response.data
                this.setState({ deportes, eventos })
            })
    }

    componentDidMount() {
        this.listardeportes()
        //this.listareventos()
    }

    render() {

        return (

            <div class="row">
                <div class="col-4">
                    <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link" href="">Deportes</a>
                            <nav class="nav nav-pills flex-column">
                                {
                                    this.state.deportes.map(deporte => {
                                        return (
                                            <a class="nav-link ms-3 my-1" href="#{deporte._id}">{deporte.Nombre}</a>
                                        )
                                    })
                                }
                            </nav>
                        </nav>
                    </nav>
                </div>

                <div class="col-8">
                    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
                        <div id="item-1">
                            <h4>Item 1</h4>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                        </div>
                        <div id="item-1-1">
                            <h5>Item 1-1</h5>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                        </div>
                        <div id="item-1-2">
                            <h5>Item 1-2</h5>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                        </div>
                        <div id="item-2">
                            <h4>Item 2</h4>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                        </div>
                        <div id="item-3">
                            <h4>Item 3</h4>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                        </div>
                        <div id="item-3-1">
                            <h5>Item 3-1</h5>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                        </div>
                        <div id="item-3-2">
                            <h5>Item 3-2</h5>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>

                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>
                            <p>...</p>

                        </div>
                    </div>
                </div>
            </div>



        )
    }

}


export default PageInicio