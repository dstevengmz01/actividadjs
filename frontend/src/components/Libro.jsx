import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/libro.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from "sweetalert2";
import EditarLibro from '../components/EditarLibro';

function Libro() {
    const navegar = useNavigate();
    const [libro, setLibro] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/api/libro')
            .then(response => response.json())
            .then(data => setLibro(data));
    }, []);

    const EliminarLibro = (id) => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Deseas eliminar este libro",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://localhost:2100/api/libro/${id}`, {
                        method: 'DELETE',
                    })
                    setLibro(libro.filter(libroid => libroid.id !== id));
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Usuario Eliminado Correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        });
                }
            }).catch(error => {
                Swal.fire("Error al eliminar el libro", error);
            });
        };

    return (
        <div className="todo d-flex justify-content-center align-items-center ">
            <div className="container mt-5">
                <h1 className="mb-4 text-center titulo">Lista de libros</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Título</th>
                            <th scope="col">Autor</th>
                            <th scope="col">Año de publicación</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libro.map(libro => (
                            <tr key={libro.id}>
                                <td>{libro.id}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.aniopublic}</td>
                                <td>{libro.stock}</td>
                                <td>
                                <button 
                                    className="btn btn-warning mx-2"
                                    onClick={() => navegar(`/editar/${libro.id}`)}>
                                    Editar
                                </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => EliminarLibro(libro.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Libro;
