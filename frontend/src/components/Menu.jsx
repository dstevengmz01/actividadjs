import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/menu.css'; 
import { Link } from 'react-router-dom'; 
function Menu() {
  return (
    <div>
      <nav className=" menuu navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Principal</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Usuario
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="nav-link" to="/usuarios">Listar</Link>
                <Link className="nav-link" to="/crearusuario">Crear</Link>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Libro
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="nav-link" to="/libros">Listar</Link>
                <Link className="nav-link" to="/crearlibro">Crear</Link>
                </ul>
              </li>
              <li className="nav-item">
              <Link className="nav-link" to="/prestamo">Prestamo</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
{/* <Link className="nav-link" to="/libros">Libro</Link> */}
