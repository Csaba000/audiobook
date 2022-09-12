import { createContext, useState } from 'react';

export const AuthContext = createContext({
    token: '',
    setToken: (token) => { },
});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(false);

    return (
        <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
    );
};
