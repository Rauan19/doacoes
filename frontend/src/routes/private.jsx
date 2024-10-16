import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const Private = ({ Component }) => {
    const session = JSON.parse(localStorage.getItem('doacao') || '{}');
    return session?.token ? <Component /> : <Navigate to="/login" />;
};

Private.propTypes = {
    Component: PropTypes.elementType.isRequired,
};
