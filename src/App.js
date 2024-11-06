// src/App.js
import React from "react";
// src/App.js
import Login from "./components/Login";

import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Login />
        {/* Otras rutas protegidas aquí */}
      </div>
    </AuthProvider>
  );
}

export default App;
