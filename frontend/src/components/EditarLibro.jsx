import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarLibro() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [titulo, setFecha] = useState("");
  const [autor, setLugar] = useState("");
  const [aniopublic, setNombrePersona] = useState("");

  useEffect(() => {
    fetch(`http://localhost:2100/api/reserva/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFecha(data.fecha_reserva);
        setLugar(data.lugar);
        setNombrePersona(data.nombreReserva);
      })
      .catch((error) => console.error("Error al cargar reserva:", error));
  }, [id]);

  const actualizarReserva = async () => {
    try {
      await fetch(`http://localhost:2100/api/reserva/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, nombreReserva: aniopublic }),
      });

      alert("Reserva actualizada exitosamente");
      navigate("/"); 
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
    }
  };

  return (
    <div>
      <h2>Actualizar Reserva</h2>
      <label>Fecha:</label>
      <input type="date" value={titulo} onChange={(e) => setFecha(e.target.value)} />

      <label>Lugar:</label>
      <input type="text" value={autor} onChange={(e) => setLugar(e.target.value)} />

      <label>Nombre Persona:</label>
      <input type="text" value={aniopublic} onChange={(e) => setNombrePersona(e.target.value)} />

      <button onClick={actualizarReserva}>Actualizar Reserva</button>
      <button onClick={() => navigate("/")}>Cancelar</button>
    </div>
  );
}

export default ActualizarLibro;