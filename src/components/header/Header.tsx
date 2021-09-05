import { FC } from 'react';
import { AppBar, Toolbar, Box, Typography } from '@material-ui/core';
import BrandingImage from 'assets/logo.svg';

import useStyles from './HeaderStyles';

 const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.brandingContainer} zIndex={1250}>
          <img src={BrandingImage} alt='branding' />
        </Box>

        <Box className={classes.titleContainer}>
          <Typography component='h1' variant='h4'>
            Watch List
          </Typography>

          <Typography className={classes.subtitle} component='h2' variant='h6'>
            Keep Track of Your Favorite Shows
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
