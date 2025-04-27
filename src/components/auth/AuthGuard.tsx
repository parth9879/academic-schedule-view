
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type AuthGuardProps = {
  children: ReactNode;
  allowedRoles?: ('admin' | 'user')[];
  redirectTo?: string;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  allowedRoles = ['admin', 'user'],
  redirectTo = '/login'
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
