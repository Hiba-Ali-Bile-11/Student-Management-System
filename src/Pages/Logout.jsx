import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Remove token / user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 2. Redirect to login page
    navigate("/login");
  }, [navigate]);

  return <p>Logging out...</p>;
}