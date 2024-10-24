import { useState, useEffect } from 'react';
import '../../../assets/components/counter.css';  // Asegúrate de agregar un archivo CSS para estilos básicos

export const Counter = () => {
    const [count, setCount] = useState(0);  // Estado del contador
    const [specialMessage, setSpecialMessage] = useState('');  // Mensaje especial que se mostrará
    const [limit, setLimit] = useState(0);  // Límite de incremento
    const [wasReset, setWasReset] = useState(false);  // Estado para saber si se reinició el contador

    // useEffect que depende de 'count' y 'limit'. Se ejecuta cada vez que 'count' cambia
    useEffect(() => {
        if(limit === 0) {
            setSpecialMessage('Ingresa un límite mayor a 0');
        } else if (wasReset && count !== 0) {
            // Cuando el contador empieza a incrementarse después del reinicio, limpiamos el mensaje de reinicio
            setSpecialMessage('');
            setWasReset(false);
        } else if (wasReset) {
            setSpecialMessage('Reiniciamos el contador :D');
        } else if (count % 5 === 0 && count !== 0 && count < limit) {
            setSpecialMessage('¡Es un múltiplo de 5!');
        } else if (count === limit) {
            setSpecialMessage('¡Límite alcanzado!, establece un nuevo límite');
        } else {
            setSpecialMessage('');
        }
    }, [count, limit, wasReset]);  // Se ejecuta cuando 'count' o 'limit' cambian

    // Función para incrementar el contador
    const handleIncrement = () => {
        if (count < limit) {  // Solo incrementamos si 'count' es menor que el límite
            setCount(prevCount => prevCount + 1);
        }
    };

    // Función para cambiar el límite dinámicamente
    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setLimit(newLimit);  // Actualizamos el valor del límite

        // Si el contador ya había alcanzado o superado el límite, reiniciamos el contador
        if (count >= newLimit) {
            setCount(0);  // Reiniciamos el contador a 0 si el nuevo límite es menor que el contador actual
            setWasReset(true);  // Activamos el estado de reinicio
            console.log('specialMessage', specialMessage);
        }
    };

    return (
        <div className="counter-container">
            <h1>Contador: {count}</h1>
            
            {/* Input para cambiar el límite */}
            <div>
                <label>
                    Establecer límite: 
                    <input 
                        type="number" 
                        value={limit} 
                        onChange={handleLimitChange} 
                        min="1"
                        max="100"
                    />
                </label>
            </div>

            {/* Botón de incrementar */}
            <button onClick={handleIncrement} disabled={count >= limit}>Incrementar</button>

            {/* Mostramos el mensaje especial si existe */}
            {specialMessage && <p className="special-message">{specialMessage}</p>}
        </div>
    );
};
