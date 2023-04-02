import { HashRouter, Routes, Route } from 'react-router-dom';
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
      <HashRouter>
        <Routes>
          <Route path={RouterPaths.LOGIN} element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={RouterPaths.MAIN} element={<Main />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
