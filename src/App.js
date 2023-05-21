import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Navigator from "./components/navigation/Navigator";
import ComplexNavbar from "./components/header/Navbar";
import { useEffect, useState } from "react";
import { checkToken } from "./services/auth.service";

function App() {
  const location = useLocation();
  const isCurrentRouteValid = ["/connexion"].includes(location.pathname);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isValid = checkToken();

  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté ici
    const loggedIn = checkLoginStatus();
    setIsAuthenticated(loggedIn);
  }, []);

  function checkLoginStatus() {
    // Vérifiez les informations d'authentification de l'utilisateur ici
    // Si l'utilisateur est connecté, renvoyez true
    // Sinon, renvoyez false
    if (isValid === true) {
      return true;
    } else {
      return false;
    }
  }

  if (isAuthenticated) {
    navigate("/connexion");
  }

  return (
    <div className="app">
      {!isCurrentRouteValid ? (
        <ComplexNavbar handleOpenModal={handleOpen} />
      ) : null}
      <Navigator />
    </div>
  );
}

export default App;
