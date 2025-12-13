// utils/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("token"); // ya koi flag
  return isAuthenticated ? children : <Navigate to="/" />;
}
