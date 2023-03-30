import { Login } from 'pages/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
