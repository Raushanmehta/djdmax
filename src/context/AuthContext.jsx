import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, adminAPI } from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);         // logged-in regular user
    const [admin, setAdmin] = useState(null);       // logged-in admin
    const [userLoading, setUserLoading] = useState(true);
    const [adminLoading, setAdminLoading] = useState(true);

    // ------ Load user on mount ------
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authAPI.getMe()
                .then((data) => setUser(data.data))
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setUserLoading(false));
        } else {
            setUserLoading(false);
        }
    }, []);

    // ------ Load admin on mount ------
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            adminAPI.getProfile()
                .then((data) => setAdmin(data.data))
                .catch(() => {
                    localStorage.removeItem('adminToken');
                    setAdmin(null);
                })
                .finally(() => setAdminLoading(false));
        } else {
            setAdminLoading(false);
        }
    }, []);

    // ------ User login ------
    const loginUser = async (email, password) => {
        const data = await authAPI.login({ email, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    // ------ User register ------
    const registerUser = async (name, email, password, phone) => {
        const data = await authAPI.register({ name, email, password, phone });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    // ------ User logout ------
    const logoutUser = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // ------ Admin login ------
    const loginAdmin = async (email, password) => {
        const data = await adminAPI.login({ email, password });
        localStorage.setItem('adminToken', data.token);
        setAdmin(data.user);
        return data;
    };

    // ------ Admin logout ------
    const logoutAdmin = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userLoading,
                loginUser,
                registerUser,
                logoutUser,
                admin,
                setAdmin,
                adminLoading,
                loginAdmin,
                logoutAdmin,
                isAuthenticated: !!(user && user.id),
                isAdminAuthenticated: !!(admin && admin.id),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};
