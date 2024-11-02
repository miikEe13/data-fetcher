import React from 'react';
import PropTypes from 'prop-types';

export const Message = ({ message, type }) => {
  // Determina la clase CSS basada en el tipo de mensaje
  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
};

// Valores predeterminados de las props
Message.defaultProps = {
  message: 'Please pay attention to this message.',
  type: 'info', // Tipo por defecto
};

// Validación de las props
Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['warning', 'error', 'info', 'success']), // Define tipos válidos
};
