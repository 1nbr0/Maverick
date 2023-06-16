import { Navigate, Outlet } from "react-router-dom";
import { checkCurrentUser } from "../../services/auth.service";

const PrivateRoutes = () => {
  const token = localStorage.getItem("access");
  const currentUser = checkCurrentUser(token);
  let auth = false;

  if (currentUser) {
    auth = { token: true };
  }

  return auth.token ? <Outlet /> : <Navigate to="/connexion" />;
};

export default PrivateRoutes;
