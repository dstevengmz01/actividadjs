import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Usuario from './components/Usuario';
import Libro from './components/Libro';
import Prestamo from './components/Prestamo';
import CrearUsuario from './components/CrearUsuario';
import CrearLibro from './components/CrearLibro';
import CrearPrestamo from './components/CrearPrestamo';
import EditarLibro from './components/EditarLibro';
import EditarUsuario from './components/EditarUsuario';
import '../src/App.css'; 


function App() {
  return (
    <Router>
      <Menu />
      <div className="d-flex flex-column min-vh-100">
       <div className="flex-grow-1">
       <Routes>
          <Route path="/" />
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/libros" element={<Libro />} />
          <Route path="/crearusuario" element={<CrearUsuario />} />
          <Route path="/crearlibro" element={<CrearLibro />} />
          <Route path="/editar/:id" element={<EditarLibro />} />
          <Route path="/editarusuario/:id" element={<EditarUsuario />} />
          <Route path="/crearprestamo" element={<CrearPrestamo />} />
          <Route path="/prestamo" element={<Prestamo />} />
        </Routes>
       </div>
      </div>
    </Router>
  );
}

export default App;
