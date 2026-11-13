import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedUserRoute = () => {
    const { isAuthenticated, userLoading } = useAuth();
    const location = useLocation();

    if (userLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-orange-500" size={32} />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export const ProtectedAdminRoute = () => {
    const { isAdminAuthenticated, adminLoading } = useAuth();
    const location = useLocation();

    // If still in initial loading state, show spinner
    if (adminLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-orange-500" size={32} />
            </div>
        );
    }

    // After loading, if NOT authenticated, immediately redirect
    if (!isAdminAuthenticated) {
        // Clear anything that might be causing a false-positive and bounce
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    // Success: authenticated admin
    return <Outlet />;
};
