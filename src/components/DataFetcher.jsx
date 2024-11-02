import React from 'react';
import { useFetch } from '../hooks/useFetch';
import '../assets/components/dataFetcher.css';
import { CardUser } from './CardUser';
import { Loader } from './Loader';


export const DataFetcher = () => {
    const { data: users, isLoading, hasError } = useFetch('https://jsonplaceholder.typicode.com/users');
    console.log(users);

    // Si hay un error, mostramos el mensaje de error
    if (hasError) return <p>Error: {hasError.message}</p>;

    // Renderizamos las cards de los usuarios
    return (
        <div className="card-container">
            <h1>Lista de Usuarios usando el hook useFetch</h1>
            {
                isLoading 
                ? <Loader/>
                : <div className='wrapper-users'>
                    {users && users.map(user => (
                        <CardUser key={user.id} user={user}/>
                    ))}
                </div>
            }
        </div>
    );
};
