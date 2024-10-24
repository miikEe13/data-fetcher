import { useState, useEffect } from 'react';

export const useCounter = (initialLimit = 0) => {
    const [count, setCount] = useState(0);  // Estado del contador
    const [limit, setLimit] = useState(initialLimit);  // Estado del límite de incremento
    const [specialMessage, setSpecialMessage] = useState('');  // Estado para mostrar mensajes especiales
    const [wasReset, setWasReset] = useState(false);  // Estado para saber si el contador se reinició

    // useEffect para manejar cuando el contador se reinicia
    useEffect(() => {
        if (wasReset && count !== 0) {
            setSpecialMessage('');
            setWasReset(false);
        } else if (wasReset) {
            setSpecialMessage('Reiniciamos el contador :D');
        }
    }, [wasReset, count]);  // Se ejecuta cuando 'wasReset' o 'count' cambian

    // useEffect para manejar cuando el contador alcanza múltiplos de 5 o llega al límite
    useEffect(() => {
        if (count % 5 === 0 && count !== 0 && count < limit) {
            setSpecialMessage('¡Es un múltiplo de 5!');
        } else if (count === limit) {
            setSpecialMessage('¡Límite alcanzado!, establece un nuevo límite');
        } else if (count === 0) {
            setSpecialMessage('Llegamos a 0 vuelve a incrementar');
        } else {
            setSpecialMessage('')
        }
    }, [count, limit]);  // Se ejecuta cuando 'count' o 'limit' cambian

        // useEffect para manejar el caso cuando el límite es 0
        useEffect(() => {
            if (limit === 0) {
                setSpecialMessage('Ingresa un límite mayor a 0');
            }
        }, [limit]);  // Se ejecuta cuando el 'limit' cambia

    // Función para cambiar el límite dinámicamente
    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);

        if (count >= newLimit) {
            setCount(0);  // Reiniciar el contador si el nuevo límite es menor o igual al contador
            setWasReset(true);
        }
    };

    // Función para incrementar el contador
    const increment = () => {
        if (count < limit) {
            setCount(prevCount => prevCount + 1);
        }
    };

    const decrement = () => {
        if (count > 0 && count <= limit) {
            setCount(prevCount => prevCount - 1);
        }
    }

    return {
        count,
        limit,
        specialMessage,
        handleLimitChange,
        increment,
        decrement
    };
};
