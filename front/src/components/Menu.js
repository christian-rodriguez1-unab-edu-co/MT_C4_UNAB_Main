import React, { Component } from "react"
import './Menu.css'
import { Link } from "react-router-dom"
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class Menu extends Component {

  state = {
    login: false,
    Username: "",
    Nombre_Completo: ""
  }

  componentDidMount() {
    if (cookies.get("Username") && cookies.get("Token") && cookies.get("Rol")) {
      const login = true
      const Username = cookies.get("Username")
      const Nombre_Completo = cookies.get("Nombre_Completo")
      this.setState({ login, Username, Nombre_Completo })
    }
  }

  render() {

    if (this.state.login) {
      return (
        <nav className="navbar navbar-primary bg-primary justify-content-between">
          <Link className="navbar-brand text-light mr-2" to='/'>
            <b>Marcadores Deportivos</b>
          </Link>
          <form className="form-inline">
            <Link className="form-inline btn text-light mr-2" aria-current="page" to='/usuario'><b>{this.state.Nombre_Completo}</b></Link>
            <Link className="form-inline btn text-light bg-dark mr-2" to='/Logout'><b>Cerrar Sesión</b></Link>
            </form>
        </nav>
      )
    } else {
      return (
        <nav className="navbar navbar-primary bg-primary justify-content-between">
          <Link className="navbar-brand text-light mr-2" to='/'>
            <b>Marcadores Deportivos</b>
          </Link>
          <form className="form-inline">
            <Link className="form-inline btn text-light bg-dark mr-2" to='/Login'><b>Ingresar</b></Link>
            <Link className="form-inline btn text-light bg-dark mr-2" to='/Signin'><b>Registrarse</b></Link>
          </form>
        </nav>
      )
    }
  }
}



export default Menu