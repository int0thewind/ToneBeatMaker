import React from 'react';
import { makeStyles, Button, ButtonGroup } from '@material-ui/core';
import { red, orange, yellow, lime, green, blue, purple, brown } from '@material-ui/core/colors'
import * as Tone from 'tone';

const PLAYBACK_DURATION = '0.1';

const ANIMATION_DURATION = '0.15s';

const MARGIN = '4pt 4pt 4pt 4pt';

const beatMakerContainerStyle = makeStyles((theme) => ({
  beatMakerBoard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: MARGIN
  },
  beatMakerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5vw',
    marginRight: '5vw',
    marginBottom: '48pt',
    padding: MARGIN,
    width: '90vw',
    position: "fixed",
    bottom: 0,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3]
  },
  beatMakerButtonGroup: {
    margin: MARGIN
  }
}))

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
        <BeatMakerCard keyCode='1' tone='C4' toDisplay={1 <= cardCount} color={red}/>
        <BeatMakerCard keyCode='2' tone='D4' toDisplay={2 <= cardCount} color={orange}/>
        <BeatMakerCard keyCode='3' tone='E4' toDisplay={3 <= cardCount} color={yellow}/>
        <BeatMakerCard keyCode='4' tone='F4' toDisplay={4 <= cardCount} color={lime}/>
        <BeatMakerCard keyCode='5' tone='G4' toDisplay={5 <= cardCount} color={green}/>
        <BeatMakerCard keyCode='6' tone='A4' toDisplay={6 <= cardCount} color={blue}/>
        <BeatMakerCard keyCode='7' tone='B4' toDisplay={7 <= cardCount} color={purple}/>
        <BeatMakerCard keyCode='8' tone='C5' toDisplay={8 <= cardCount} color={brown}/>
      </div>
      <div>
      <ButtonGroup size='medium' variant='contained' color='primary' className={classes.beatMakerButtonGroup}>
        <Button onClick={incCount} disabled={cardCount === 8}> + </Button>
        <Button onClick={decCount} disabled={cardCount === 1}> - </Button>
      </ButtonGroup>
      </div>
    </div>
  )
}

const beatMakerCardStyle = makeStyles((theme) => ({
  beatMakerCard: {
    width: props => props.toDisplay ? '84pt' : '0pt',
    height: '40pt',
    margin: MARGIN,
    borderRadius: '8pt',
    backgroundColor: props => props.color[500],
    '&:hover': {
      backgroundColor: props => props.color[200]
    },
    opacity: props => props.toDisplay ? '1' : '0',
    transition: `opacity ${ANIMATION_DURATION} ease-in-out,
      width ${ANIMATION_DURATION} ease-out,
      background-color ${ANIMATION_DURATION} ease-in-out`,
      boxShadow: theme.shadows[1]
  }
}))

function BeatMakerCard(props) {
  const classes = beatMakerCardStyle(props);
  const synth = new Tone.Synth().toDestination();
  
  const mouseClickPlay = () => {
    synth.triggerAttackRelease(props.tone, PLAYBACK_DURATION);
  }

  return (
    <div
      className={`${classes.beatMakerCard} beat-maker-card`}
      onClick={mouseClickPlay}>
    </div>
  )
}

export default BeatMakerContainer;
