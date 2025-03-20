import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Swal from 'sweetalert2';
function Libro() {
const [libro, setLibro] = useState([]);
const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    aniopublic: '',
    stock: ''
});

useEffect(() => {
        fetch('http://localhost:2100/api/libro')
            .then(response => response.json())
            .then(data => setLibro(data));
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

    if (!formData.titulo || !formData.autor || !formData.aniopublic || !formData.stock) {
        Swal.fire("Complete todos los campos");
        return;
    }
    if (formData.stock <= 0) {
        Swal.fire("La cantidad debe ser mayor a 0");
        return;
    }

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres agregar este libro?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://localhost:2100/api/libro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                setLibro([...libro, data]);
                setFormData({
                    titulo: '',
                    autor: '',
                    aniopublic: '',
                    stock: ''
                });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Libro Agregado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
            .catch(error => {
                Swal.fire("Error al agregar el libro", error);
            });
        }
    });
};


return (
<div className="todo d-flex justify-content-center align-items-center">
    <div className="container mt-5">
        <h1 className=" text-center titulo">Crear Libro</h1>
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
            <label>Titulo:</label>
            <input type="text" name="titulo" className="form-control" value={formData.titulo} onChange={handleChange}/>
            </div>
            <div className="form-group">
            <label>Autor:</label>
            <input type="text" name="autor" className="form-control"value={formData.autor} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label>Año De Publicacion:</label>
            <input type="date" name="aniopublic" className="form-control" value={formData.aniopublic} onChange={handleChange} />
            </div>
            <div className="form-group">
            <label>Cantidad:</label>
            <input type="number" name="stock" className="form-control" value={formData.stock} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Agregar Libro</button>
        </form>
    </div>
        </div>
    );
}

export default Libro;
