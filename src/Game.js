import React from 'react';
import connectHoc from './Mappers';

class Game extends React.Component {
  constructor(props) {
    super(props);
    // console.log("game")
    // console.log(props)
    // load game board
    props.dispatch({type: "LOAD_GAME", difficulty: props.difficulty});
  }
  
  handleClick() {
    if (this.props.isSelected === 'false') {
      this.props.dispatch({type: "SELECT_CARD", id: this.props.id});
    } else {
      this.props.dispatch({type: "DESELECT_CARD", id: this.props.id});
    }
  }
  
  render() {
    // console.log("Game render")
    // console.log(this.props)
    let msgColor = this.props.store.isMatch === 'yes' ? 'green' : 'red';
    let msg = this.props.store.isMatch === 'empty' ? '' : this.props.store.isMatch === 'no' ? "Cards don't match!" :
      (this.props.store.leftCards.length === 0 && this.props.store.shownCards.length === 0) ? 'You win!!' : 'Cards match!';
    return (
      <div id='game'>
        <div className='cards'>
          {this.props.store.shownCards}
        </div>
        <div className={msgColor}>
          {msg}
        </div>
      </div>
    );
  }
}

const ConnectedGame = connectHoc(Game);

export default ConnectedGame;