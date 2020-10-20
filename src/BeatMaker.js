import React from 'react';
import { makeStyles } from '@material-ui/core';
import { red, orange, yellow, green, blue, purple} from '@material-ui/core/colors'

const beatMakerContainerStyle = makeStyles({
  beatMakerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: "fixed",
    bottom: 0,
    width: '100%',
    marginBottom: '24pt'
  }
})

function BeatMakerContainer() {
  const classes = beatMakerContainerStyle();

  return (
    <div className={classes.beatMakerContainer}>
      <BeatMakerCard key='1' color={red[500]}/>
      <BeatMakerCard key='2' color={orange[500]}/>
      <BeatMakerCard key='3' color={yellow[500]}/>
      <BeatMakerCard key='4' color={green[500]}/>
      <BeatMakerCard key='5' color={blue[500]}/>
      <BeatMakerCard key='6' color={purple[500]}/>
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
  return (
    <div className={classes.beatMakerCard}>

    </div>
  )
}

export default BeatMakerContainer;
