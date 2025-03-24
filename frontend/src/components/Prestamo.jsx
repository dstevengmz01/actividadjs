import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from "sweetalert2";

function Prestamo() {
    const [usuarios, setUsuarios] = useState([]);
    const [libros, setLibros] = useState([]);
    const navegar = useNavigate();
    const [prestamo, setPrestamo] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/api/prestamo')
            .then(response => response.json())
            .then(data => setPrestamo(data));

    fetch('http://localhost:2100/api/usuario')
    .then(response => response.json())
    .then(data => setUsuarios(data));


    fetch('http://localhost:2100/api/libro')
    .then(response => response.json())
    .then(data => setLibros(data));
    }, []);

    const EliminarPrestamo = (id) => {
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "Deseas eliminar este Prestamo",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí"
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch(`http://localhost:2100/api/prestamo/${id}`, {
                            method: 'DELETE',
                        })
                        setPrestamo(prestamo.filter(prestamoid => prestamoid.id !== id));
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Prestamo Eliminado Correctamente",
                                showConfirmButton: false,
                                timer: 1500
                            });
                    }
                }).catch(error => {
                    Swal.fire("Error al eliminar el Prestamo", error);
                });
            };
    return (
        <div className="todo d-flex justify-content-center">
            <div className="container mt-5">
                <h1 className="mb-4 text-center titulo">Lista de prestamos</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Libro</th>
                            <th scope="col">fecha_prestamo</th>
                            <th scope="col">fechadevolucion</th>
                            <th scope="col">estado</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        prestamo.map(prestamo => 
                        {
                            const usuario = usuarios.find(usuarios => usuarios.id === prestamo.usuario_id);
                            const libro = libros.find(libros => libros.id === prestamo.libro_id);
                                return (
                                    <tr key={prestamo.id}>
                                        <td>{prestamo.id}</td>
                                        <td>{usuario ? usuario.nombre : "Desconocido"}</td>
                                        <td>{libro ? libro.titulo : "Desconocido"}</td>
                                        <td>{prestamo.fecha_prestamo}</td>
                                        <td>{prestamo.fechadevolucion}</td>
                                        <td>{prestamo.estado}</td>
                                        <td>
                                            <button 
                                                className="btn btn-warning mx-2"
                                                onClick={() => navegar(`/editarprestamo/${prestamo.id}`)}>
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => EliminarPrestamo(prestamo.id)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                );
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prestamo;
