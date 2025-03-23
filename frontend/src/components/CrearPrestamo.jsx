import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';

function Prestamo() {
    const [prestamo, setPrestamo] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [libros, setLibros] = useState([]);
    const [formData, setFormData] = useState({
        usuario_id: '',
        libro_id: '',
        fecha_prestamo: '',
        fechadevolucion: '',
        estado: ''
    });

    useEffect(() => {
        fetch('http://localhost:2100/api/usuario')
            .then(response => response.json())
            .then(data => setUsuarios(data));

        fetch('http://localhost:2100/api/libro')
            .then(response => response.json())
            .then(data => setLibros(data));

        fetch('http://localhost:2100/api/prestamo')
            .then(response => response.json())
            .then(data => setPrestamo(data));
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

        if (!formData.usuario_id || !formData.libro_id) {
            Swal.fire("Debe Seleccionar Un Usuario y un libro");
            return;
        }

        if (!formData.fecha_prestamo || !formData.fechadevolucion || !formData.estado) {
            Swal.fire("Complete todos los campos");
            return;
        }

        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Quieres agregar este préstamo?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:2100/api/prestamo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then(response => response.json())
                    .then(data => {
                        setPrestamo([...prestamo, data]);
                        setFormData({
                            usuario_id: '',
                            libro_id: '',
                            fecha_prestamo: '',
                            fechadevolucion: '',
                            estado: ''
                        });
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Préstamo Agregado Correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        Swal.fire("Error al agregar el préstamo", error);
                    });
            }
        });
    };

    return (
        <div className="todo d-flex justify-content-center align-items-center">
            <div className="container mt-5">
                <h1 className="mb-4 text-center titulo">Crear Préstamo</h1>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="form-group">
                        <label>Usuario:</label>
                        <select  name="usuario_id" className="form-select" value={formData.usuario_id} onChange={handleChange}>
                            <option value="" disabled>Seleccione un Usuario</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <br />

                    <label>Libro:</label>
                    <div className="form-group">
                        <select name="libro_id" className="form-select" value={formData.libro_id} onChange={handleChange}>
                            <option value="" disabled>Seleccione un Libro</option>
                            {libros.map((libro) => (
                                <option key={libro.id} value={libro.id}>
                                    {libro.titulo}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Fecha Préstamo:</label>
                        <input
                            type="date"
                            name="fecha_prestamo"
                            className="form-control"
                            value={formData.fecha_prestamo}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha Devolución:</label>
                        <input
                            type="date"
                            name="fechadevolucion"
                            className="form-control"
                            value={formData.fechadevolucion}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Estado:</label>
                        <select
                            name="estado"
                            className="form-select"
                            value={formData.estado}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Seleccione un estado</option>
                            <option value="Prestado">Préstamo</option>
                            <option value="Devuelto">Devuelto</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Agregar Préstamo</button>
                </form>
            </div>
        </div>
    );
}

export default Prestamo;
