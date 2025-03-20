import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Prestamo() {
    const [prestamo, setPrestamo] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2100/api/prestamo')
            .then(response => response.json())
            .then(data => setPrestamo(data));
    }, []);

    return (
        <div className="todo d-flex justify-content-center">
            <div className="container mt-5">
                <h1 className="mb-4 text-center titulo">Lista de libros</h1>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">usuario_id</th>
                            <th scope="col">libro_id</th>
                            <th scope="col">fecha_prestamo</th>
                            <th scope="col">fechadevolucion</th>
                            <th scope="col">estado</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prestamo.map(prestamo => (
                            <tr key={prestamo.id}>
                                <td>{prestamo.id}</td>
                                <td>{prestamo.usuario_id}</td>
                                <td>{prestamo.libro_id}</td>
                                <td>{prestamo.fecha_prestamo}</td>
                                <td>{prestamo.fechadevolucion}</td>
                                <td>{prestamo.estado}</td>
                                <td>
                                    <button className="btn btn-warning mx-2">Editar</button>
                                    <button className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Prestamo;
