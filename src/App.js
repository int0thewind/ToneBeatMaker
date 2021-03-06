import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import { BrightnessHigh, Brightness2, Info } from '@material-ui/icons';
import React from 'react';
import BeatMakerContainer from './BeatMaker';
import PropTypes from 'prop-types';

function App() {
  const isCurrentDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [ isDarkMode, setDarkMode ] = React.useState(isCurrentDarkMode);
  const autoTheme = createMuiTheme({
    palette: { type: isDarkMode ? 'dark' : 'light' }
  });
  const changeTheme = () => setDarkMode(!isDarkMode);

  return (
    <ThemeProvider theme={autoTheme}>
      <TopBar isDarkMode={isDarkMode} changeTheme={changeTheme}/>
      <AppArea/>
    </ThemeProvider>
  );
}

const topBarStyle = makeStyles({
  barTitle: { flexGrow: '1'}
})

function TopBar(props) {
  const classes = topBarStyle();
  const [ dialogOpen, setDialogOpen ] = React.useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' className={classes.barTitle}>Tone Beat Maker</Typography>
        <IconButton onClick={props.changeTheme} color='inherit'>
          {props.isDarkMode ? <BrightnessHigh/> : <Brightness2/>}
        </IconButton>
        <IconButton color='inherit' onClick={openDialog}>
          <Info/>
        </IconButton>
      </Toolbar>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          Tone Beat Maker Info
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on each block to play sound.<br /> Long click to customize each block's setting.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}

TopBar.propTypes = {
  isDarkMode: PropTypes.bool,
  changeTheme: PropTypes.func
}

const appAreaStyle = makeStyles((theme) => ({
  appBackground: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%'
  }
}));

function AppArea() {
  const classes = appAreaStyle();

  return (
    <div className={classes.appBackground}>
      <BeatMakerContainer/>
    </div>
  );
}

export default App;
