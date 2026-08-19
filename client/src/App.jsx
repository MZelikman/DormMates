import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import RoommatesPage from './pages/RoommatesPage.jsx';
import ChoresPage from './pages/ChoresPage.jsx';
import './App.css';

function App() {
  const tab = ({ isActive }) =>
    `pb-3 -mb-px border-b-2 text-sm font-medium transition-colors ${
    isActive
    ? 'border-brass text-ink'
    : 'border-transparent text-inksoft hover:text-ink'
  }`;

  return (
    <BrowserRouter>
      <header className="bg-surface border-b border-line">
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-3xl font-extrabold tracking-tight">
              DormMates
            </h1>
            <span className="font-mono text-[11px] uppercase tracking-widest text-inksoft">
              Residence Manager
            </span>
          </div>
          <p className="mt-2 text-inksoft max-w-md">
            Chore rotation that settles itself, so no one has to be the one who
            brings it up.
          </p>

          <nav className="flex gap-6 mt-6">
            <NavLink to="/" end className={tab}>
            Household
            </NavLink>
            <NavLink to="/chores" className={tab}>
            Rotation
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<RoommatesPage />} />
          <Route path="/chores" element={<ChoresPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;