import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "./firebaseConfig.js"; // porque firebaseConfig.js está en la misma carpeta que AuthContext.js

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda la información del usuario
  const [loading, setLoading] = useState(true); // Indica si Firebase está verificando el estado

  useEffect(() => {
    // Verificar el estado del usuario con Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Termina el estado de carga
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  // Función para cerrar sesión
  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
