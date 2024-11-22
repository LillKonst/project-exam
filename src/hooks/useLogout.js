import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    logout();
    navigate("");
  };
}
