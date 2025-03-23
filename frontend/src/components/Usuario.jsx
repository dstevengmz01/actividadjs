import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from "sweetalert2";
import EditarUsuario from '../components/EditarUsuario';
function Usuario() {
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/api/usuario')
            .then(response => response.json())
            .then(data => setUsuario(data));
    }, []);

    const EliminarUsuario = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Deseas eliminar este usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:2100/api/usuario/${id}`, {
                    method: 'DELETE',
                })
                    setUsuario(usuario.filter(usuarioid => usuarioid.id !== id));
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Usuario Eliminado Correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
            }
        }).catch(error => {
            Swal.fire("Error al eliminar el usuario", error);
        });
    };

    return (
        <div className="todo d-flex justify-content-center align-items-center "> 
            <div className="container mt-5">
                <h1 className="mb-4 text-center titulo">Lista de Usuarios</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">nombre</th>
                            <th scope="col">correo</th>
                            <th scope="col">telefono</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map(usuario => (
                            <tr >
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.telefono}</td>
                                <td>
                                <button 
                                    className="btn btn-warning mx-2"
                                    onClick={() => navegar(`/editarusuario/${usuario.id}`)}>
                                    Editar
                                </button>
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => EliminarUsuario(usuario.id)}>
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

export default Usuario;
