import React, { Component } from "react"
import axios from 'axios'
import Cookies from 'js-cookie'


const baseUrl = "http://140.238.190.38:4000/api/";

class Usuario extends Component {

    state = {
        user: []
    }

    getUsuario = () => {

//        console.log(Cookies.get('Rol'))

        const Rol = Cookies.get('Rol')
        const Token = Cookies.get('Token')
        const Username = Cookies.get('Username')

        axios({
            method: 'get',
            url: baseUrl + "usuarios/" + Username,
            headers: { "Username": Username, "Rol": Rol, "Token": Token },
            data: {}
        })

            .then(response => {
                
                //console.log(response.data)
                const user = response.data
                console.log(user)
                this.setState({ user })
          
            })

            .catch(response => {
                console.log(response.response.data.msg)
                alert(response.response.data.msg)
                window.location.href='../logout'

            })
    }

    componentDidMount() {
        this.getUsuario()
    }

    render() {

        return (

            <div className="row">
                <div className="col-3">
                    <nav id="navbar-example3" className="h-100 flex-column align-items-stretch pe-4 border-end">
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link" href="">Usuario</a>
                            <nav className="nav nav-pills flex-column">
                                {
                                    this.state.user.map(user => {
                                        return (
                                            <div>
                                                <input className="nav-link ms-3 my-1" href={"#" + user._id}>{user.Nombre_Completo}</input>
                                                <input className="nav-link ms-3 my-1" href={"#" + user._id}>{user.Username}</input>
                                                <input className="nav-link ms-3 my-1" href={"#" + user._id}>{user.Password}</input>
                                            </div>
                                        )
                                    })
                                }
                            </nav>
                        </nav>
                    </nav>
                </div>
            </div>
        )

    }
                        
}


export default Usuario