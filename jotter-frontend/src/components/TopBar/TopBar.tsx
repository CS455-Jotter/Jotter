import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import colorPalette from '@/components/config/config';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif', // Set Montserrat as the font family
  },
});

function TopBar({ auth, setAuth }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuth(false);
    router.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ width: '100%', backgroundColor: colorPalette.white, padding: '10px' }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 900, color: 'black' }}>
              JOTTER
            </Typography>
            {auth && (
              <Link href="/" style={{ textDecoration: 'none', color: 'black' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colorPalette.white,
                    width: '150px',
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '10px',
                    ':hover': {
                      bgcolor: colorPalette.white,
                      color: 'black',
                    },
                    textTransform: 'none',
                    fontSize: 20,
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            )}
            {!auth && (
              <Link href="/login" style={{ textDecoration: 'none', color: 'black' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colorPalette.white,
                    width: '150px',
                    color: 'black',
                    border: '1px solid black',
                    borderRadius: '10px',
                    ':hover': {
                      bgcolor: colorPalette.white,
                      color: 'black',
                    },
                    textTransform: 'none',
                    fontSize: 20,
                  }}
                >
                  Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default TopBar;
