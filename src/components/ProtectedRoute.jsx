import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // alert("ProtectedRoute waa la galay");

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;