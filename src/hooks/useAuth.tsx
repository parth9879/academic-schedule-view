
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

// Define the user type
export type User = {
  id: string;
  username: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

// Mock database (in a real app, this would be an API call)
const MOCK_USERS: User[] = [
  { id: '1', username: 'admin', role: 'admin' },
  { id: '2', username: 'user', role: 'user' },
];

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login functionality
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 500));
    
    const foundUser = MOCK_USERS.find(u => u.username === username);
    
    if (foundUser && password === 'password') { // In a real app, check hashed password
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.username}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
      throw new Error('Invalid credentials');
    }
    setIsLoading(false);
  };

  // Mock registration
  const register = async (username: string, password: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 500));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.username === username)) {
      toast({
        title: "Registration failed",
        description: "Username already exists",
        variant: "destructive"
      });
      setIsLoading(false);
      throw new Error('Username already exists');
    }
    
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      username,
      role: 'user' as const
    };
    
    // In a real app, we would send this to the backend
    // For now, just update our local state
    MOCK_USERS.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
