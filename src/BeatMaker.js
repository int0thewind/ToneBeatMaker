import React from 'react';
import { makeStyles, Button, ButtonGroup } from '@material-ui/core';
import { red, orange, yellow, lime, green, blue, purple, brown } from '@material-ui/core/colors'
import * as Tone from 'tone';

const beatMakerContainerStyle = makeStyles({
  beatMakerBoard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '122pt',
    width: '100%',
  },
  beatMakerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '24pt',
    position: "fixed",
    bottom: 0,
  }
})

function BeatMakerContainer() {
  const classes = beatMakerContainerStyle();
  const [ cardCount, setCardCount ] = React.useState(6);
  const incCount = () => {
    if (cardCount < 8)
      setCardCount(cardCount + 1);
  }
  const decCount = () => {
    if (cardCount > 1)
      setCardCount(cardCount - 1);
  }

  return (
    <div className={classes.beatMakerContainer}>
      <div className={classes.beatMakerBoard}>
        <BeatMakerCard keyCode='1' tone='C4' display={1 <= cardCount} color={red[500]}/>
        <BeatMakerCard keyCode='2' tone='D4' display={2 <= cardCount} color={orange[500]}/>
        <BeatMakerCard keyCode='3' tone='E4' display={3 <= cardCount} color={yellow[500]}/>
        <BeatMakerCard keyCode='4' tone='F4' display={4 <= cardCount} color={lime[500]}/>
        <BeatMakerCard keyCode='5' tone='G4' display={5 <= cardCount} color={green[500]}/>
        <BeatMakerCard keyCode='6' tone='A4' display={6 <= cardCount} color={blue[500]}/>
        <BeatMakerCard keyCode='7' tone='B4' display={7 <= cardCount} color={purple[500]}/>
        <BeatMakerCard keyCode='8' tone='C5' display={8 <= cardCount} color={brown[500]}/>
      </div>
      <div>
      <ButtonGroup size='small' variant='contained' color='secondary'>
        <Button onClick={incCount} disabled={cardCount === 8}> + </Button>
        <Button onClick={decCount} disabled={cardCount === 1}> - </Button>
      </ButtonGroup>
      </div>
    </div>
  )
}

const beatMakerCardStyle = makeStyles({
  beatMakerCard: {
    width: '84pt',
    height: '40pt',
    margin: '4pt 4pt 4pt 4pt',
    borderRadius: '8pt',
    backgroundColor: props => props.color,
    display: props => props.display ? 'initial' : 'none',
    transition: 'width 2s ease-in-out',
  }
})

function BeatMakerCard(props) {
  const classes = beatMakerCardStyle(props);
  const synth = new Tone.Synth().toDestination();
  
  const mouseClickPlay = () => {
    synth.triggerAttackRelease(props.tone, '0.2');
  }

  return (
    <Button
      className={`${classes.beatMakerCard} beat-maker-card`}
      onClick={mouseClickPlay}>
    </Button>
  )
}

export default BeatMakerContainer;
