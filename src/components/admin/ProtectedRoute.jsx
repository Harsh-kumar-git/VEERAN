import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect them to the /admin/login page, but save the current location they were trying to go to
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
