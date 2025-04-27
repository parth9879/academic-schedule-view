
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, User } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              University Timetable Portal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Access your class schedules anytime, anywhere. Stay organized with our intuitive timetable management system.
            </p>
            
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    <User size={18} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Register Now
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/dashboard">
                <Button size="lg" className="px-8">
                  <Calendar size={18} className="mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
          
          <div className="mt-12 md:mt-16 bg-card rounded-lg shadow-lg p-4 md:p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Demo of Timetable View</h3>
                  <p className="mb-8 text-muted-foreground">
                    A clean, organized way to view your class schedules
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                      <div key={day} className="bg-primary/20 p-2 rounded">
                        <h4 className="font-medium">{day}</h4>
                        <div className="mt-2 h-16 bg-white/40 rounded flex items-center justify-center text-xs">
                          Sample Class
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/40">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Timetables</h3>
              <p className="text-muted-foreground">
                View your class schedules in an intuitive, easy-to-read format with all the details you need.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-muted-foreground">
                Students can view their schedules while administrators can manage all timetable data.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground">
                Your data is protected with modern authentication and security practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
