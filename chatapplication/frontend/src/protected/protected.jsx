// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userdata }) => {
  if (!userdata) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
