import React from 'react';
import { makeStyles, Button, ButtonGroup, Paper, Card, TextField } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { red, orange, yellow, lime, green, blue, purple, brown } from '@material-ui/core/colors'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import * as Tone from 'tone';
import PropTypes from 'prop-types';
import tet from './lib/tet/tet';

const PLAYBACK_DURATION = '0.1';

const ANIMATION_DURATION = '0.15s';

const MARGIN = '4pt 4pt 4pt 4pt';

const NO_MARGIN = '0pt 0pt 0pt 0pt';

const beatMakerContainerStyle = makeStyles({
  beatMakerPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: 'fit-content',
    padding: MARGIN,
    transition: `width ${ANIMATION_DURATION} ease-in-out`,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }, beatMakerBoard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: MARGIN
  }, beatMakerButtonGroup: {
    margin: MARGIN
  }
});

function BeatMakerContainer() {
  const classes = beatMakerContainerStyle();
  const [ isStarted, setIsStarted ] = React.useState(false);
  const [ cardCount, setCardCount ] = React.useState(6);
  const startPlaying = async () => {
    setIsStarted(true);
    await Tone.start();
  };
  const incCount = () => setCardCount(cardCount + 1);
  const decCount = () => setCardCount(cardCount - 1);

  return (
    <Paper className={classes.beatMakerPaper} elevation={4}>
      { isStarted ?
        <>
        <div className={classes.beatMakerBoard}>
          <BeatMakerCard keyCode='1' pitch='C4' toDisplay={1 <= cardCount} color={red}/>
          <BeatMakerCard keyCode='2' pitch='D4' toDisplay={2 <= cardCount} color={orange}/>
          <BeatMakerCard keyCode='3' pitch='E4' toDisplay={3 <= cardCount} color={yellow}/>
          <BeatMakerCard keyCode='4' pitch='F4' toDisplay={4 <= cardCount} color={lime}/>
          <BeatMakerCard keyCode='5' pitch='G4' toDisplay={5 <= cardCount} color={green}/>
          <BeatMakerCard keyCode='6' pitch='A4' toDisplay={6 <= cardCount} color={blue}/>
          <BeatMakerCard keyCode='7' pitch='B4' toDisplay={7 <= cardCount} color={purple}/>
          <BeatMakerCard keyCode='8' pitch='C5' toDisplay={8 <= cardCount} color={brown}/>
        </div>
        <ButtonGroup size='medium' variant='contained' color='primary' className={classes.beatMakerButtonGroup}>
          <Button onClick={decCount} disabled={cardCount === 1}> - </Button>
          <Button onClick={incCount} disabled={cardCount === 8}> + </Button>
        </ButtonGroup>
        </> :
        <Button variant='contained' color='secondary' onClick={startPlaying} startIcon={<PlayArrow />}>
          Play
        </Button>
      }
    </Paper>
  )
}

const beatMakerCardStyle = makeStyles({
  beatMakerCard: {
    height: '40pt',
    borderRadius: '8pt',
    width: props => props.toDisplay ? '84pt' : '0pt',
    margin: props => props.toDisplay ? MARGIN : NO_MARGIN,
    backgroundColor: props => props.color[500],
    '&:hover': { backgroundColor: props => props.color[200] },
    opacity: props => props.toDisplay ? '1' : '0',
    transition: `opacity ${ANIMATION_DURATION} ease-in-out,
      width ${ANIMATION_DURATION} ease-in-out,
      background-color ${ANIMATION_DURATION} ease-out`,
  }
});

function checkPitchValid(pitch) {
  try {
    // eslint-disable-next-line no-unused-vars
    const _ = (!(typeof pitch === 'string' &&
      pitch.match(/^[A-G]((#|b)?)(00|[0-9])$/gm)[0] === pitch))
    tet.pitchToMidi(pitch)
  } catch (error) {
    return false;
  }
  return true;
}

function BeatMakerCard(props) {
  const classes = beatMakerCardStyle(props);
  const synth = new Tone.Synth().toDestination();

  const [ pitch, setPitch ] = React.useState(props.pitch);
  const [ isPitchValid, setPitchValid ] = React.useState(true);

  const [ settingOpen, setSettingOpen ] = React.useState(false);
  const openSetting = () => setSettingOpen(true);
  const closeSetting = () => setSettingOpen(false);
  
  const mouseClick = () => synth.triggerAttackRelease(pitch, PLAYBACK_DURATION);
  const doubleMouseClick = () => openSetting();

  const textFieldOnChange = (e) => {
    let newPitch = e.target.value;
    setPitchValid(checkPitchValid(newPitch));
    setPitch(newPitch);
  }

  return (
    <>
      <Card
        raised={true}
        className={classes.beatMakerCard}
        onClick={mouseClick}
        onDoubleClick={doubleMouseClick}
      />
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={settingOpen}
      >
        <DialogTitle>
          {`Change tone for Key${props.keyCode}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            label='Input New Pitch'
            variant='outlined'
            value={pitch}
            onChange={textFieldOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSetting} color='primary' disabled={!isPitchValid}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

BeatMakerCard.propTypes = {
  keyCode: PropTypes.string.isRequired,
  pitch: PropTypes.string.isRequired,
  toDisplay: PropTypes.bool.isRequired,
  color: PropTypes.object.isRequired, // Mui colors is a pure object, no types. 
}

export default BeatMakerContainer;
