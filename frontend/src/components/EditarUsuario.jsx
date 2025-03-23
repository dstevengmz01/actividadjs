import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
function ActualizarUsuario() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");


  useEffect(() => {
    fetch(`http://localhost:2100/api/usuario/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNombre(data.nombre);
        setCorreo(data.correo);
        setTelefono(data.telefono);
      })
      .catch((error) => console.error("Error al cargar Libro:", error));
  }, [id]);

  const actualizarUsuario = async () => {
    if (!nombre.trim() || !correo.trim() || !telefono.trim()) {
      Swal.fire("Complete todos los campos");
      return;
    }

    if (telefono.length < 8 || telefono.length > 10) {
      Swal.fire("El teléfono debe tener entre 8 y 10 dígitos");
      return;
    }
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
        Swal.fire("Ingrese un correo electrónico válido");
        return;
      }

    try {
      await fetch(`http://localhost:2100/api/usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, telefono }),
      });

      alert("Usuario actualizado exitosamente");
      navigate("/usuarios"); 
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };

  return (
    <div>
      <h2>Actualizar Usuario</h2>
      <div className="form-group">
      <label>Nombre:</label>
      <input type="text" class="form-control" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></input >
      </div>
      <div className="form-group">
      <label>Correo:</label>
      <input type="email" class="form-control"  placeholder="Correo electronico" value={correo} onChange={(e) => setCorreo(e.target.value)}></input>
      </div>
      <div className="form-group">
      <label>telefono</label>
      <input type="text" class="form-control"  placeholder="Telefono"value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
      </div>
      <button type="button" className="btn btn-success" onClick={actualizarUsuario}>Actualizar Usuario</button>
      <button type="button" className="btn btn-secondary" onClick={() => navigate("/usuarios")}>Cancelar</button>
    </div>
  );
}

export default ActualizarUsuario;