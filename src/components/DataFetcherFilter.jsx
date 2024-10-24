import { useState, useEffect } from 'react';
import '../assets/components/dataFetcher.css'; // Asegúrate de agregar un archivo CSS para estilos básicos

export const DataFetcherFilter = () => {
    const [users, setUsers] = useState([]);  // Estado para almacenar todos los usuarios
    const [filteredUsers, setFilteredUsers] = useState([]);  // Estado para los usuarios filtrados
    const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda
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
                setUsers(result);  // Guardamos todos los usuarios en el estado 'users'
                setFilteredUsers(result);  // Inicialmente, mostramos todos los usuarios
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);  // Solo se ejecuta una vez al montar el componente

    // Función para manejar el cambio en el input y filtrar los usuarios
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);  // Actualiza el término de búsqueda
        
        // Filtramos los usuarios según el término de búsqueda
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);  // Actualizamos el estado con los usuarios filtrados
    };

    // Si está cargando, mostramos el mensaje de carga
    if (loading) return <p>Cargando...</p>;
    
    // Si hay un error, mostramos el mensaje de error
    if (error) return <p>Error: {error.message}</p>;

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

            {/* Mostramos las cards de los usuarios filtrados */}
            <div className='wrapper-users'>
                {filteredUsers.map(user => (
                    <div key={user.id} className="user-card">
                        <h2>{user.name}</h2>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                    </div>
                ))}

                {/* Si no hay usuarios filtrados, mostramos un mensaje */}
                {filteredUsers.length === 0 && <p>No se encontraron usuarios.</p>}
            </div>
        </div>
    );
};
