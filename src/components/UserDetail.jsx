import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Loader } from './Loader';
import { Message } from './Message';

export const UserDetail = () => {
    const { id } = useParams();
    const { data: user, isLoading, hasError } = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (isLoading) return <Loader />;
    if (hasError) return <Message type="danger" message="Error en la llamada" />;
    
    // Verifica si `user` es falsy después de cargar y no hay error
    if (user && Object.keys(user).length === 0) {
        return <Message type="warning" message="Usuario no encontrado" />;
    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">{user?.name}</h2>
            <div className="card shadow">
                <div className="card-body">
                    <h5 className="card-title">Información de Contacto</h5>
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Phone:</strong> {user?.phone}</p>
                    <p><strong>Website:</strong> <a href={`http://${user?.website}`} target="_blank" rel="noopener noreferrer">{user?.website}</a></p>
                    
                    <h5 className="card-title mt-4">Dirección</h5>
                    <p>{user.address?.street}, {user.address?.suite}</p>
                    <p>{user.address?.city}, {user.address?.zipcode}</p>
                    
                    <h5 className="card-title mt-4">Compañía</h5>
                    <p><strong>Nombre:</strong> {user.company?.name}</p>
                    <p><strong>Eslogan:</strong> {user.company?.catchPhrase}</p>
                    <p><strong>Negocio:</strong> {user.company?.bs}</p>
                </div>
            </div>
        </div>
    );
};
