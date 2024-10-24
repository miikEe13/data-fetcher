import '../../../assets/components/counter.css';  // Asegúrate de agregar un archivo CSS para estilos básicos
import { useCounter } from '../../../hooks/useCounter';  // Importamos el hook personalizado 

export const Counter = () => {
    const { count, limit, specialMessage, handleLimitChange, increment, decrement } = useCounter(0);  // Usamos el hook personalizado

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
                        onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                        min="1"
                        max="100"
                    />
                </label>
            </div>
            <div className='mt-4'>
                <button onClick={increment} disabled={count >= limit}>
                    Incrementar
                </button>
                <button onClick={decrement} className='ms-4 decrement btn btn-secondary' disabled={count <= 0}>
                    Decrementar
                </button>
            </div>
            {/* Botón de incrementar */}

            {/* Mostramos el mensaje especial si existe */}
            {specialMessage && <p role="alert" className="mt-4 special-message alert alert-danger">{specialMessage}</p>}
        </div>
    );
};

