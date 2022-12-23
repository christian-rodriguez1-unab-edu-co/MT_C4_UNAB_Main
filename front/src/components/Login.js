import React, { Component } from "react"
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

const baseUrl="http://140.238.190.38:4000/api/usuarios";
const cookies = new Cookies();

class Login extends Component{
    
  state={
    tipoModal:'',
    form:{
      Nombre_Completo:'',
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

  registrarUsuario=async()=>{
    await axios({
      method: 'post',
      url: baseUrl,
      headers:{},
      data:{
        Nombre_Completo: this.state.form.Nombre_Completo,
        Username: this.state.form.Username,
        Password: md5(this.state.form.Password)
      }})

      .then(response=>{
        console.log(response.data)
        this.modalInsertar(); /// para cerrar la modal
        }).catch(error=>{
        console.log(error.message);
      })
    }

  iniciarSesion=async()=>{
      
    await axios({
      method: 'post',
      url: baseUrl + "/login",
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
          if(respuesta.Rol>1){
            window.location.href='./Eventos'
          }else{
            window.location.href='./Marcadores'
          }
        }
                    
      })
      
    .catch(error=>{
      console.log(error)
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar})
  }
    
    render(){
  
      const form=this.state.form
  
          return(
            
            <div class='Principal'>
              <div class='Secundario'>
            <form>
            
              <div class="form-outline mb-4">
                <input type="text" id="Username" class="form-control" name="Username" onChange={this.handleChange}/>
                <label class="form-label" for="form2Example1">username: </label>
              </div>
            
  
              <div class="form-outline mb-4">
                <input type="password" id="Password" class="form-control" name="Password" onChange={this.handleChange}/>
                <label class="form-label" for="form2Example2">Password</label>
              </div>
                   
              <button type="button" class="btn btn-primary btn-block mb-4" onClick={()=>this.iniciarSesion()}>Iniciar Sesion</button>
            
              <div class="text-center">
                <p>No eres Usuario? <button type="button" className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}} >Registrarse</button></p>
                
              </div>
             
            
            </form>
            </div>
  
  
        <Modal isOpen={this.state.modalInsertar}>
  
        <ModalHeader style = {{display:'block'}}>
  
        </ModalHeader>
  
        <ModalBody>
    
          
          <label htmlFor="Nombre_Completo">Nombre_Completo</label>
          <input className="form-control" type="text" name="Nombre_Completo" id="Nombre_Completo" onChange={this.handleChange} value={form?form.Nombre_Completo:''}></input><br/>
          <label htmlFor="Username">Username</label>
          <input className="form-control" type="text" name="Username" id="Username" onChange={this.handleChange} value={form?form.Username: ''}></input><br/>
          <label htmlFor="Password">Password</label>
          <input className="form-control" type="password" name="Password" id="Password" onChange={this.handleChange} value={form?form.Password: ''}></input><br/>
     
      
        </ModalBody>
  
        <ModalFooter>
        {
        this.state.tipoModal==='insertar'?
        <button className="btn btn-success" onClick={()=>this.registrarUsuario()}>insertar</button>
        :<button className="btn btn-success">Guardar</button>
        }
        <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
       
  
     
       
        </ModalFooter>
  
  
      </Modal >
  
            </div>
          )
      }
  }
  

export default Login