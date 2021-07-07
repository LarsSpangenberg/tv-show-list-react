import { createMuiTheme } from "@material-ui/core";

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2ce198',
    },
    secondary: {
      main: '#ff9800',
      light: '#e9e891',
    } 
  },
  dimensions: {
    headerHeight: 150,
    sidebarWidth: 150,
  },
  shape: {
    borderRadius: 8,
  },
});

export default mainTheme;
