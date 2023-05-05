import { useLocation } from 'react-router-dom';
import './App.css';
import HeaderNavbar from './components/header/HeaderNav';
import Navigator from './components/navigation/Navigator';

function App() {
  const location = useLocation();
  const isCurrentRouteValid = ['/'].includes(location.pathname);

  return (
    <div className="App">
      {isCurrentRouteValid ? <HeaderNavbar /> : null}
      <Navigator />
    </div>
  );
}

export default App;
