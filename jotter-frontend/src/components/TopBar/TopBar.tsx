import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import Link from 'next/link';
import colorPalette from '@/components/config/config';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif', // Set Montserrat as the font family
  },
});

function TopBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" style={{ width: '100%', backgroundColor: colorPalette.white }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight:900, color:"black" }}>
              JOTTER
            </Typography>
            {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
            )}
            {!auth && (
              <Link href="/login" style={{ textDecoration: 'none', color: 'black' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colorPalette.white,
                    width: '150px',
                    color: 'black',
                    borderRadius: '40px',
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
