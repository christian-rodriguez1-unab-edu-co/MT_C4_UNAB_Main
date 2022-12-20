import React, { Component } from "react"
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class Logout extends Component{
    
  componentDidMount() {
    cookies.remove('Nombre_Completo')
    cookies.remove('Rol')
    cookies.remove('Token')
    cookies.remove('Username')
    alert("Sesión cerrada satisfatoriamiente.")
    window.location.href='./'
  }

  render() {
    return(<></>)
  }

}


export default Logout