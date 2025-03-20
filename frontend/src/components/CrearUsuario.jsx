import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
function Usuario() {
const [usuario, setUsuario] = useState([]);
const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: ''
});

useEffect(() => {
        fetch('http://localhost:2100/api/usuario')
            .then(response => response.json())
            .then(data => setUsuario(data));
}, []);

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.correo || !formData.telefono) {
        Swal.fire("Complete todos los campos");
        return;
    }

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres agregar este usuario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://localhost:2100/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                setUsuario([...usuario, data]);
                setFormData({
                    nombre: '',
                    correo: '',
                    telefono: ''
                });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario Agregado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
            .catch(error => {
                Swal.fire("Error al agregar el usuario", error);
            });
        }
    });
};

return (
<div className="todo d-flex justify-content-center align-items-center">
    <div className="container mt-5">
        <h1 className="mb-4 text-center titulo">Crear Usuario</h1>
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange}/>
            </div>
            <div className="form-group">
            <label>Correo:</label>
            <input type="email" name="correo" className="form-control"value={formData.correo} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label>Teléfono:</label>
            <input type="text" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Agregar Usuario</button>
        </form>
    </div>
        </div>
    );
}

export default Usuario;
