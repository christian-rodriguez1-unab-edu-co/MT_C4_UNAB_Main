import React, { Component } from "react"
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import Cookies from 'js-cookie'


const baseUrl="http://140.238.190.38:4000/api/";


class PageEquipos extends Component{
  state={
    data:[],
    modalInsertar:false,
    tipoModal:'',
    deportes:[],
    form:{
        Nombre:'',
        Imagen:'',
        Deporte_ID:''
    
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



listardeportes=()=>{
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

  registrarEquipo=async()=>{
    const Rol = Cookies.get('Rol')
    const Token = Cookies.get('Token')
    const Username = Cookies.get('Username')

    axios({
        method: 'post',
        url: baseUrl + "equipos",
        headers: { "Username": Username, "Rol": Rol, "Token": Token },
        data: {Nombre: this.state.form.Nombre,
               Imagen: this.state.form.Imagen,
               Deporte_ID: this.state.form.Deporte_ID}})

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

componentDidMount() {
    this.listardeportes()
}
  
  render(){

    const form=this.state.form

        return(
          
          <div class='Principal'>
            <div class='Secundario'>
          <form>
                  
            <div class="text-center">
              <p>_Registra aqui tu Equipo <button type="button" className="btn btn-success" onClick={()=>{this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}} >Registrar Equipo</button></p>
              
            </div>
           
          
          </form>
          </div>


      <Modal isOpen={this.state.modalInsertar}>

      <ModalHeader style = {{display:'block'}}>

      </ModalHeader>

      <ModalBody>
  
        
        <label htmlFor="Nombre">Nombre</label>
        <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre:''}></input> <br/>
         
        <label htmlFor="Imagen">Imagen</label>
        <input className="form-control" type="text" name="Imagen" id="Imagen" onChange={this.handleChange} value={form?form.Imagen:''}></input> <br/>

        <label htmlFor="Imagen">Deporte_ID</label>
        <input className="form-control" type="text" list="Deporte_ID" name="Deporte_ID" onChange={this.handleChange} value={form?form.datalist:''} />
        <datalist id="Deporte_ID">{this.state.deportes.map(deporte => {
            return (<option value={deporte._id}>{deporte.Nombre}</option>)})}
          </datalist>

    
      </ModalBody>

      <ModalFooter>
      {
      this.state.tipoModal==='insertar'?
      <button className="btn btn-success" onClick={()=>this.registrarEquipo()}>Registrar</button>
      :<button className="btn btn-success">Guardar</button>
      }
      <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
     

   
     
      </ModalFooter>


    </Modal >

          </div>
        )
    }
}


export default PageEquipos