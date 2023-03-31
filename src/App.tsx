import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { Login, Main } from 'pages';
import { ProtectedRoutes } from 'utils/ProtectedRoutes';

export enum RouterPaths {
  MAIN = '/',
  LOGIN = '/login',
}

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={RouterPaths.LOGIN} element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={RouterPaths.MAIN} element={<Main />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
