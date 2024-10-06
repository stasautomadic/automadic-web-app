import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, BarChart, Settings, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Sponsors', icon: Users, path: '/' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <nav className="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AUTOMADIC</h1>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-lg transition-colors duration-150 ease-in-out ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;