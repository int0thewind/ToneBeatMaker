import React from 'react';
import { makeStyles, Button, ButtonGroup, Paper, Card } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import { red, orange, yellow, lime, green, blue, purple, brown } from '@material-ui/core/colors'
import * as Tone from 'tone';
import PropTypes from 'prop-types';

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
          <BeatMakerCard keyCode='1' tone='C4' toDisplay={1 <= cardCount} color={red}/>
          <BeatMakerCard keyCode='2' tone='D4' toDisplay={2 <= cardCount} color={orange}/>
          <BeatMakerCard keyCode='3' tone='E4' toDisplay={3 <= cardCount} color={yellow}/>
          <BeatMakerCard keyCode='4' tone='F4' toDisplay={4 <= cardCount} color={lime}/>
          <BeatMakerCard keyCode='5' tone='G4' toDisplay={5 <= cardCount} color={green}/>
          <BeatMakerCard keyCode='6' tone='A4' toDisplay={6 <= cardCount} color={blue}/>
          <BeatMakerCard keyCode='7' tone='B4' toDisplay={7 <= cardCount} color={purple}/>
          <BeatMakerCard keyCode='8' tone='C5' toDisplay={8 <= cardCount} color={brown}/>
        </div>
        <ButtonGroup size='medium' variant='contained' color='primary' className={classes.beatMakerButtonGroup}>
          <Button onClick={decCount} disabled={cardCount === 1} size='large'> - </Button>
          <Button onClick={incCount} disabled={cardCount === 8} size='large'> + </Button>
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

function BeatMakerCard(props) {
  const classes = beatMakerCardStyle(props);
  const synth = new Tone.Synth().toDestination();
  
  const mouseClickPlay = () => {
    synth.triggerAttackRelease(props.tone, PLAYBACK_DURATION);
  }

  return (
    <Card
      raised={true}
      className={classes.beatMakerCard}
      onClick={mouseClickPlay}>
    </Card>
  )
}

BeatMakerCard.propTypes = {
  keyCode: PropTypes.string,
  tone: PropTypes.string,
  toDisplay: PropTypes.bool,
  color: PropTypes.object, // Mui colors is a pure object, no types. 
}

export default BeatMakerContainer;
