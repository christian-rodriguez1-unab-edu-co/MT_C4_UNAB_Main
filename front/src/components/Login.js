import React, { Component } from "react"
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'

const baseUrl="http://140.238.190.38:4000/api/usuarios/login";
const cookies = new Cookies();

class Login extends Component{
    
  state={
    form:{
      Username:'',
      Password:''
    }
  }
  
  handleChange=async e=>{
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    //console.log(this.state.form);
   

  }

  componentDidMount() {
    if(cookies.get("Username") && cookies.get("Token") && cookies.get("Rol")){
    window.location.href='./'
    }
  }

  iniciarSesion=async()=>{
      
    await axios({
      method: 'post',
      url: baseUrl,
      headers:{},
      data:{
        Username: this.state.form.Username,
        Password: md5(this.state.form.Password)
      }})
    
    .then(response=>{
      console.log(response.data)
      return response.data
    }).then(response=>{
        if(response.message){
          alert("Aleta: "+response.message)
          cookies.remove('Nombre_Completo')
          cookies.remove('Rol')
          cookies.remove('Token')
          cookies.remove('Username')
        }else{
          var respuesta=response;
          cookies.set('Nombre_Completo',respuesta.Nombre_Completo,{path:"/"})
          cookies.set('Rol', respuesta.Rol,{path:"/"})
          cookies.set('Token', respuesta.Token,{path:"/"})
          cookies.set('Username', respuesta.Username,{path:"/"})
          //alert("Bienveni@ "+respuesta.Nombre_Completo)
          window.location.href='./'
        }
                    
      })
      
    .catch(error=>{
      console.log(error)
    })
  }
  
  render(){
        return(
          
          <div className='Principal'>
            <div className='Secundario'>
          <form>
          
            <div className="form-outline mb-4">
              <label className="form-label" for="form2Example1">username: </label>
              <input type="text" id="Username" className="form-control" name="Username" onChange={this.handleChange} />
            </div>
          

            <div className="form-outline mb-4">
              <label className="form-label" for="form2Example2">Password</label>
              <input type="password" id="Password" className="form-control" name="Password" onChange={this.handleChange} />
            </div>

      
            <button type="button" className="btn btn-primary btn-block mb-4" onClick={()=>this.iniciarSesion()}>iniciar Sesion</button>
          
            
            <div className="text-center">
              <p>No cuenta con usuario? <a href="#!">Registese aquí!</a></p>
              
            </div>
           
          
          </form>
          </div>
          </div>
        )
    }
}


export default Login