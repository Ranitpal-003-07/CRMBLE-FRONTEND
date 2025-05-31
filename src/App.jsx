import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Segments from './pages/Segments';
import Campaigns from './pages/Campaigns';
import Profile from './pages/Profile';
import MainDashboard from './pages/MainDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Root route redirects to home */}
        <Route path="/" element={<Home />} />
        
        {/* Dashboard nested routes */}
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<MainDashboard/>} />
          <Route path="customers" element={<Customers />} />
          <Route path="segments" element={<Segments />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;