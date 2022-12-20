//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Menu from './components/Menu';
import PageInicio from './components/PageInicio';
import Login from './components/Login';
import Logout from './components/Logout';


import Equipos from './components/Equipos';

import MiPerfil from './components/MiPerfil';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


class App extends Component {

  render() {
    return (
      <>

        <Router>
          <Menu />
          <Routes>
            <Route path='/' element={<PageInicio />} />
            <Route path='/PageInicio' element={<PageInicio />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Logout' element={<Logout />} />

            <Route path='/Equipos' element={<Equipos />} />
            <Route path='/MiPerfil' element={<MiPerfil />} />

          </Routes>
        </Router>


      </>

    );
  }
}

export default App;
