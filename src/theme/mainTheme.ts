import { createTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';

const defaultTheme = createTheme();

const mainTheme = createTheme({
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: defaultTheme.palette.grey[300],
        },
        ul: {
          listStyleType: 'none',
          paddingInlineStart: 0,
        },
      },
    },
  },
});

export default mainTheme;

// Custom Property types
declare module '@mui/material/styles' {
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
