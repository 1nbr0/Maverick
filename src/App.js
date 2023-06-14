import { useLocation } from "react-router-dom";
import "./App.css";
import Navigator from "./components/navigation/Navigator";
import ComplexNavbar from "./components/header/Navbar";
import { useEffect, useState } from "react";
import { apiUrl } from "./services/auth.service";

function App() {
  const location = useLocation();
  const isCurrentRouteValid = ["/connexion"].includes(location.pathname);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh_token) {
        const url = apiUrl + "/token/refresh";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: localStorage.refresh_token,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.token;
            localStorage.refresh_token = data.refreshToken;
          });
      }
    }
    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 3);
  }, []);

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
