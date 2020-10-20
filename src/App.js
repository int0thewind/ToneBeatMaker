import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import {BrightnessHigh, Brightness2, Info} from '@material-ui/icons';
import React from 'react';
import BeatMakerContainer from './BeatMaker';

function App() {
  const [ isDarkMode, setDarkMode ] = React.useState(false);
  const autoTheme = createMuiTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light'
    }
  });
  const changeTheme = () => {setDarkMode(!isDarkMode)};
  return (
    <ThemeProvider theme={autoTheme}>
      <TopBar isDarkMode={isDarkMode} changeTheme={changeTheme}/>
      <AppArea/>
    </ThemeProvider>
  );
}

const topBarStyle = makeStyles({
  barTitle: {
    flexGrow: '1',
  }
})

function TopBar(props) {
  const classes = topBarStyle();
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' className={classes.barTitle}>Tone Beat Maker</Typography>
        <IconButton onClick={props.changeTheme} color='inherit'>
          {props.isDarkMode ? <Brightness2/> : <BrightnessHigh/>}
        </IconButton>
        <IconButton color='inherit'>
          <Info />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const useStyle = makeStyles((theme) => ({
  appBackground: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%'
  },
  playButton: {

  }
}));

function AppArea() {
  const classes = useStyle();
  
  return (
    <div className={classes.appBackground}>
      <BeatMakerContainer/>
    </div>
  )
}

export default App;
