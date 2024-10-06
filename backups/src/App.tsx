import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SponsorList from './components/SponsorList';
import SponsorPage from './components/SponsorPage';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div className="flex min-h-screen bg-background text-foreground">
          <Navbar />
          <div className="flex-1 ml-64">
            <main className="container mx-auto mt-8 px-4">
              <Routes>
                <Route path="/" element={<SponsorList />} />
                <Route path="/sponsor/:id" element={<SponsorPage />} />
                <Route path="/dashboard" element={<div>Dashboard (Coming Soon)</div>} />
                <Route path="/analytics" element={<div>Analytics (Coming Soon)</div>} />
                <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;