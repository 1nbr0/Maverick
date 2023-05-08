import { useLocation } from "react-router-dom";
import "./App.css";
import Navigator from "./components/navigation/Navigator";
import ComplexNavbar from "./components/header/Navbar";

function App() {
  const location = useLocation();
  const isCurrentRouteValid = ["/"].includes(location.pathname);

  return (
    <div className="app">
      {isCurrentRouteValid ? <ComplexNavbar /> : null}
      <Navigator />
    </div>
  );
}

export default App;
