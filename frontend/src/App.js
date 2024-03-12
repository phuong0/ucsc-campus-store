import { Switch } from "./Switch.js";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./components/Theme.js";

// adding the routes to the app

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Switch />
        </ThemeProvider>
    );
}

export default App;