import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import SponsorList from './components/SponsorList';
import SponsorPage from './components/SponsorPage';
import ProfilePage from './components/ProfilePage';
import SettingsPage from './components/SettingsPage';
import { ThemeProvider } from './components/theme-provider';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="flex min-h-screen bg-background text-foreground">
          <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
            <main className="container mx-auto mt-8 px-4">
              <Routes>
                <Route path="/" element={isAuthenticated ? <SponsorList /> : <Navigate to="/login" />} />
                <Route path="/sponsor/:id" element={isAuthenticated ? <SponsorPage /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={isAuthenticated ? <div>Dashboard (Coming Soon)</div> : <Navigate to="/login" />} />
                <Route path="/analytics" element={isAuthenticated ? <div>Analytics (Coming Soon)</div> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
                <Route path="/login" element={<div>Please log in to access this page.</div>} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;