import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RoommatesPage from './pages/RoommatesPage.jsx';
import ChoresPage from './pages/ChoresPage.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Roommates</Link>
        <Link to="/chores">Chores</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RoommatesPage />} />
        <Route path="/chores" element={<ChoresPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;