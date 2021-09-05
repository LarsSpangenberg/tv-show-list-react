import { createMuiTheme } from '@material-ui/core';
import { CSSProperties } from 'react';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2ce198',
    },
    secondary: {
      main: '#ff9800',
      light: '#e9e891',
    },
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

// Custom Property types
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    dimensions: {
      headerHeight: CSSProperties['height'];
      sidebarWidth: CSSProperties['width'];
    };
  }

  interface ThemeOptions {
    dimensions?: {
      headerHeight?: CSSProperties['height'];
      sidebarWidth?: CSSProperties['width'];
    };
  }
}
