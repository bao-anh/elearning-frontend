import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f44336' },
    error: { main: '#f44336' },
    friendMessage: { main: '#f1f0f0' },
    ownMessage: { main: '#0099ff' },
    white: { main: '#ffffff' },
  },
  typography: {
    fontFamily: "'Montserrat Alternates', 'Aldrich'",
  },
});

export default theme;
