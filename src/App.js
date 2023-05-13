import { useLocation } from "react-router-dom";
import "./App.css";
import Navigator from "./components/navigation/Navigator";
import ComplexNavbar from "./components/header/Navbar";
import Modal from "./components/modal/Modal";
import { useState } from "react";

function App() {
  const location = useLocation();
  const isCurrentRouteValid = ["/"].includes(location.pathname);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className="app">
      {isCurrentRouteValid ? (
        <ComplexNavbar handleOpenModal={handleOpen} />
      ) : null}
      <Navigator />
    </div>
  );
}

export default App;
