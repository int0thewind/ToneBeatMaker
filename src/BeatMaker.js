import React from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { red, orange, yellow, green, blue, purple} from '@material-ui/core/colors'
import * as Tone from 'tone';

// const keyCodeMapping = {
//   0: 48,
//   1: 49,
//   2: 50,
//   3: 51,
//   4: 52,
//   5: 53,
//   6: 54,
//   7: 55,
//   8: 56,
//   9: 57
// }

const beatMakerContainerStyle = makeStyles({
  beatMakerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: "fixed",
    bottom: 0,
    width: '100%',
    height: '122pt',
    marginBottom: '24pt'
  }
})

function BeatMakerContainer() {
  const classes = beatMakerContainerStyle();

  const [inited, setInited] = React.useState(false);
  const initialize = async () => {
    setInited(true);
    await Tone.start();
  }

  return (
    <div className={classes.beatMakerContainer}>
      {
        !inited ?
        <Button onClick={initialize} variant='contained'
      color='secondary' endIcon={<PlayArrow/>} size='large'>
          Start Playing!
        </Button> :
        <>
          <BeatMakerCard key='1' tone='C4' color={red[500]}/>
          <BeatMakerCard key='2' tone='D4' color={orange[500]}/>
          <BeatMakerCard key='3' tone='E4' color={yellow[500]}/>
          <BeatMakerCard key='4' tone='G4' color={green[500]}/>
          <BeatMakerCard key='5' tone='A4' color={blue[500]}/>
          <BeatMakerCard key='6' tone='C5' color={purple[500]}/>
        </>
      }
    </div>
  )
}

const beatMakerCardStyle = makeStyles({
  beatMakerCard: {
    width: '120pt',
    height: '48pt',
    margin: '4pt 4pt 4pt 4pt',
    borderRadius: '8pt',
    backgroundColor: props => props.color
  }
})

function BeatMakerCard(props) {
  const classes = beatMakerCardStyle(props);
  const synth = new Tone.Synth().toDestination();
  
  const mouseClickPlay = () => synth.triggerAttackRelease(props.tone, '0.2');
  // const keyClickPlay = (k, e) => {
  //   console.log(e);
  //   console.log(k);
  //   synth.triggerAttackRelease(props.tone, '0.2')
  // }

  return (
    <div
      className={`${classes.beatMakerCard} beat-maker-card`}
      onClick={mouseClickPlay}>
    </div>
  )
}

export default BeatMakerContainer;
