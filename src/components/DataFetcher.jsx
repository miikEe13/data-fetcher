import { useState, useEffect } from 'react';
import '../assets/components/dataFetcher.css'; // Asegúrate de agregar un archivo CSS para estilos básicos

export const DataFetcher = () => {
    const [users, setUsers] = useState([]);  // Cambiamos 'data' a 'users' y el estado inicial es un array vacío
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect para hacer la llamada a la API al montar el componente
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                
                if (!response.ok) {
                    throw new Error('Error al buscar los usuarios');
                }

                const result = await response.json();
                setUsers(result);  // Guardamos los usuarios en el estado
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);  // Solo se ejecuta una vez al montar el componente

    // Si está cargando, mostramos el mensaje de carga    
    // Si hay un error, mostramos el mensaje de error
    if (error) return <p>Error: {error.message}</p>;

    // Renderizamos las cards de los usuarios
    return (
        <div className="card-container">
            <h1>Lista de Usuarios</h1>
            {
                loading && ( <h2>Cargando...</h2> )
            }
            <div className='wrapper-users'>
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <h2>{user.name}</h2>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
