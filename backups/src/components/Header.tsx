import React from 'react';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-end">
        <div className="flex items-center space-x-2">
          <User className="w-8 h-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;