import { FC } from 'react';
import { AppBar, Toolbar, Box, Typography, useTheme } from '@mui/material';
import BrandingImage from 'assets/logo.svg';

const Header: FC = () => {
  const {
    dimensions: { headerHeight, sidebarWidth },
    spacing,
  } = useTheme();

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          paddingLeft: 0,
          height: headerHeight,
        }}
      >
        <Box
          position={'absolute'}
          top={0}
          left={0}
          zIndex={1250}
          sx={{
            padding: '20px',
            height: headerHeight,
            width: sidebarWidth,
          }}
        >
          <img src={BrandingImage} alt='branding' />
        </Box>

        <Box
          sx={{
            marginLeft: `${(sidebarWidth as number) + parseInt(spacing(2))}px`,
          }}
        >
          <Typography component='h1' variant='h4'>
            Watch List
          </Typography>

          <Typography component='h2' variant='h6' mt={1} ml={4}>
            Keep Track of Your Favorite Shows
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
