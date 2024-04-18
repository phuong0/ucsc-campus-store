import { Switch } from "./Switch.js";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./components/Theme.js";

import React, { useState } from "react";


// adding the routes to the app

function App() {

    const [userid, setUserID] = useState(sessionStorage.getItem('userid'));

    const login = (temp) => {
        setUserID(temp);
        sessionStorage.setItem('userid', temp);
      };
    
    const logout = () => {
        setUserID(null);
        sessionStorage.removeItem('userid');
      };

    return (
        <ThemeProvider theme={theme}>
      <Switch userid={userid} onLogin={login} onLogout={logout} />
    </ThemeProvider>
  );
}

export default App;