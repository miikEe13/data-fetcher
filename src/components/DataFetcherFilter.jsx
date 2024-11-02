import React, { useState, useEffect } from 'react';
import '../assets/components/dataFetcher.css';
import { Loader } from './Loader';
import { CardUser } from './CardUser';
import { useFetch } from '../hooks/useFetch';
import { Message } from './Message';
export const DataFetcherFilter = () => {
    const { data: users, isLoading, hasError } = useFetch('https://jsonplaceholder.typicode.com/users');
    const [filteredUsers, setFilteredUsers] = useState([]);  // Estado para los usuarios filtrados
    const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda

    // useEffect para actualizar filteredUsers cuando se cambian los usuarios o el término de búsqueda
    useEffect(() => {
        if (users) {
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    }, [users, searchTerm]);

    // Función para manejar el cambio en el input y actualizar searchTerm
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Si hay un error, mostramos el mensaje de error
    if (hasError) return <Message type="danger" message={`Error en la llamada`} />;

    // Renderizamos las cards de los usuarios filtrados
    return (
        <div className="card-container">
            <h1>Buscar Usuarios por Nombre</h1>

            {/* Input para buscar usuarios por nombre */}
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Ingresa el nombre del usuario"
                />
            </div>

            {/* Mostramos las cards de los usuarios filtrados o el loader */}
            {isLoading ? (
                <Loader />
            ) : (
                <div className='wrapper-users'>
                    {filteredUsers.map(user => (
                        <CardUser key={user.id} user={user}/>
                    ))}

                    {/* Si no hay usuarios filtrados, mostramos un mensaje */}
                    {filteredUsers.length === 0 && <Message type='warning' message="User Not Found" />}
                </div>
            )}
        </div>
    );
};
