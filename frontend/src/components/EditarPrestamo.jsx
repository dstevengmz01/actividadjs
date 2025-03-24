import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ActualizarPrestamo() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [usuario_id, setUsuarioid] = useState("");
  const [libro_id, setLibroId] = useState("");
  const [fecha_prestamo, setFechaPrestamo] = useState("");
  const [fechadevolucion, setFechaDevolucion] = useState("");
  const [estado, setEstado] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [libros, setLibros] = useState([]);


  useEffect(() => {
    fetch("http://localhost:2100/api/usuario")
    .then((response) => response.json())
    .then((data) => setUsuarios(data))
    .catch((error) => console.error("Error al cargar usuarios:", error));

  fetch("http://localhost:2100/api/libro")
    .then((response) => response.json())
    .then((data) => setLibros(data))
    .catch((error) => console.error("Error al cargar libros:", error));

    fetch(`http://localhost:2100/api/prestamo/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUsuarioid(data.usuario_id);
        setLibroId(data.libro_id);
        const fechaPrestamos = new Date(data.fecha_prestamo).toISOString().split('T')[0];
        setFechaPrestamo(fechaPrestamos);
        const fechadevoluciones = new Date(data.fechadevolucion).toISOString().split('T')[0];
        setFechaDevolucion(fechadevoluciones);
        setEstado(data.estado);
      })
      .catch((error) => console.error("Error al cargar Prestamo:", error));
  }, [id]);

  const actualizarPrestamo = async () => {
    try {
      await fetch(`http://localhost:2100/api/prestamo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id, libro_id, fecha_prestamo,fechadevolucion,estado}),
      });

      alert("Prestamo actualizado exitosamente");
      navigate("/prestamo"); 
    } catch (error) {
      console.error("Error al actualizar el Prestamo:", error);
    }
  };

  return (
    <div>
      <h2>Actualizar Prestamo</h2>
      
      <div className="form-group">
        <label>Usuario:</label>
          <select name="usuario" className="form-select" value={usuario_id} onChange={(e) => setUsuarioid(e.target.value)}>
            <option value="" disabled>Seleccione un usuario</option>
              {usuarios.map((usuario) => (
            <option option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>))}
          </select>
      </div>

      <div className="form-group">
        <label>Libro:</label>
          <select  className="form-select" value={libro_id} onChange={(e) => setLibroId(e.target.value)}>
            <option value="" disabled>Seleccione un Libro</option>
              {libros.map((libro) => (
            <option option key={libro.id} value={libro.id}>
              {libro.titulo}
            </option>))}
          </select>
      </div>

      <div className="form-group">
      <label>Fecha Prestamo</label>
      <input type="date" class="form-control"  placeholder="Fecha Prestamo" value={fecha_prestamo} onChange={(e) => setFechaPrestamo(e.target.value)}></input>
      </div>

      <div className="form-group">
      <label>Fecha Devolucion</label>
      <input type="date" class="form-control"  placeholder="Fecha Devolucion" value={fechadevolucion} onChange={(e) => setFechaDevolucion(e.target.value)}></input>
      </div>

      <div className="form-group">
        <label>Estado:</label>
          <select name="estado" className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="" disabled>Seleccione un estado</option>
              <option value="Prestado">Prestado</option>
              <option value="Devuelto">Devuelto</option>
          </select>
      </div>

      <button type="button" className="btn btn-success" onClick={actualizarPrestamo}>Actualizar Prestamo</button>
      <button type="button" className="btn btn-secondary" onClick={() => navigate("/prestamo")}>Cancelar</button>
    </div>
  );
}

export default ActualizarPrestamo;