import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ActualizarLibro() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [aniopublic, setAnioPublicidad] = useState("");
  const [stock, setStock] = useState("");


  useEffect(() => {
    fetch(`http://localhost:2100/api/libro/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitulo(data.titulo);
        setAutor(data.autor);
        const fechaModificada = new Date(data.aniopublic).toISOString().split('T')[0];
        setAnioPublicidad(fechaModificada);
        setStock(data.stock);
      })
      .catch((error) => console.error("Error al cargar Libro:", error));
  }, [id]);

  const actualizarLibro = async () => {
    try {
      await fetch(`http://localhost:2100/api/libro/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, aniopublic,stock }),
      });

      alert("Libro actualizado exitosamente");
      navigate("/libros"); 
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
    }
  };

  return (
    <div>
      <h2>Actualizar Libro</h2>
      <div className="form-group">
      <label>Titulo:</label>
      <input type="text" class="form-control" placeholder="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)}></input >
      </div>
      <div className="form-group">
      <label>Autor:</label>
      <input type="text" class="form-control"  placeholder="autor" value={autor} onChange={(e) => setAutor(e.target.value)}></input>
      </div>
      <div className="form-group">
      <label>Fecha Publicacion</label>
      <input type="date" class="form-control"  placeholder="fecha" value={aniopublic} onChange={(e) => setAnioPublicidad(e.target.value)}></input>
      </div>
      <div className="form-group">
      <label>Stock</label>
      <input type="number" class="form-control"  placeholder="Stock"value={stock} onChange={(e) => setStock(e.target.value)}></input>
      </div>
      <button type="button" className="btn btn-success" onClick={actualizarLibro}>Actualizar Libro</button>
      <button type="button" className="btn btn-secondary" onClick={() => navigate("/libros")}>Cancelar</button>
    </div>
  );
}

export default ActualizarLibro;