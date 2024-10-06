import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, BarChart, Settings, Home, Menu, ChevronRight, ChevronLeft, User, ChevronDown } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Sponsors', icon: Users, path: '/' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`bg-gray-900 text-white h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out ${
      isSidebarOpen ? 'w-64' : 'w-16'
    } flex flex-col`}>
      <div className="flex justify-between items-center p-4">
        {isSidebarOpen && <h1 className="text-2xl font-bold">AUTOMADIC</h1>}
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {isAuthenticated && user && isSidebarOpen && (
        <div className="px-4 py-2 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 hover:bg-gray-800 rounded-lg p-2 w-full">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-grow text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <ChevronDown size={16} className="ml-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem as={Link} to="/profile">Profile</DropdownMenuItem>
              <DropdownMenuItem as={Link} to="/settings">Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <ul className="flex-grow">
        {navItems.map((item) => (
          <li key={item.name} className="mb-4">
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-lg transition-colors duration-150 ease-in-out ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
            >
              <item.icon className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : 'mr-0'}`} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-4">
        {isAuthenticated ? (
          <Button onClick={() => logout({ returnTo: window.location.origin })} className="flex items-center w-full justify-center">
            <User className="mr-2 h-4 w-4" />
            {isSidebarOpen && 'Logout'}
          </Button>
        ) : (
          <Button onClick={() => loginWithRedirect()} className="flex items-center w-full justify-center">
            <User className="mr-2 h-4 w-4" />
            {isSidebarOpen && 'Login'}
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;