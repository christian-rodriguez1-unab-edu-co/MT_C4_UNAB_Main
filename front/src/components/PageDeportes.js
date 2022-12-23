import React, { Component } from "react"
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Cookies from 'js-cookie'


const baseUrl="http://140.238.190.38:4000/api/";




class PageDeportes extends Component{
  state={
    data:[],
    modalInsertar:false,
    tipoModal:'',
    form:{
      Nombre:''
    
    }
  }
  
  handleChange=async e=>{
    e.persist();  
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form);
  }

  

  registrarDeporte=async()=>{
    const Rol = Cookies.get('Rol')
    const Token = Cookies.get('Token')
    const Username = Cookies.get('Username')

    axios({
        method: 'post',
        url: baseUrl + "deportes",
        headers: { "Username": Username, "Rol": Rol, "Token": Token },
        data: {Nombre:this.state.form.Nombre}

    })

        .then(response=>{
          console.log(response.data)
          this.modalInsertar(); /// para cerrar la modal
          }).catch(error=>{
          
          console.log(error);
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
                  
            <div class="text-center">
              <p>_Registra aqui tu Deporte <button type="button" className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}} >Registrar Deporte</button></p>
              
            </div>
           
          
          </form>
          </div>


      <Modal isOpen={this.state.modalInsertar}>

      <ModalHeader style = {{display:'block'}}>

      </ModalHeader>

      <ModalBody>
  
        
        <label htmlFor="Nombre">Nombre</label>
        <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre:''}></input> <br/>
  
    
      </ModalBody>

      <ModalFooter>
      {
      this.state.tipoModal==='insertar'?
      <button className="btn btn-success" onClick={()=>this.registrarDeporte()}>Registrar</button>
      :<button className="btn btn-success">Guardar</button>
      }
      <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
     

   
     
      </ModalFooter>


    </Modal >

          </div>
        )
    }
}


export default PageDeportes