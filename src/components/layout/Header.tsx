
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">UniSchedule</span>
        </Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Logged in as <span className="font-medium">{user.username}</span>
              {' '}<span className="text-xs px-2 py-1 bg-secondary/10 rounded-full">
                {user.role}
              </span>
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
