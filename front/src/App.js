//import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Menu from './components/Menu';
import PageInicio from './components/PageInicio';
import Login from './components/Login';
import Logout from './components/Logout';
import Usuario from './components/Usuario';


import Equipos from './components/Equipos';


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
            <Route path='/Usuario' element={<Usuario />} />

            <Route path='/Equipos' element={<Equipos />} />

          </Routes>
        </Router>


      </>

    );
  }
}

export default App;
