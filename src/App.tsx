import { Login, Main } from 'pages';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
