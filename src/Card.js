import React from 'react';
import {connect} from 'react-redux';
import './Card.css';

export const COLORS = ['blue', 'green', 'red'];
export const NUMBERS = [1, 2, 3];
export const SHADINGS = ['open', 'solid', 'striped'];
export const SHAPES = ['diamond', 'oval', 'squiggle'];

class Card extends React.Component {
  checkIsFinded() {
    for (let i = 0; i < this.props.store.findedSet.length; i++) {
      if (this.props.store.findedSet[i].props.id === this.props.id)
        return true;
    }
    return false;
  }

  checkIsSelected() {
    for (let i = 0; i < this.props.store.selected.length; i++) {
      if (this.props.store.selected[i].props.id === this.props.id)
        return true;
    }
    return false;
  }

  handleClick() {
    if (!this.checkIsSelected()) {
      this.props.dispatch({type: "SELECT_CARD", id: this.props.id});
    } else {
      this.props.dispatch({type: "DESELECT_CARD", id: this.props.id});
    }
  }

  render() {
    return (
      <div className={`card ${this.checkIsFinded() ? 'finded' : this.checkIsSelected() ? 'selected' : ''}`} onClick={() => this.handleClick()}>
          {[...Array(parseInt(this.props.number, 10))].map((_, i) =>
            <img key={i} src={`/images/${this.props.shape}_${this.props.shading}_${this.props.color}.png`} alt='' />
          )}
      </div> 
    );
  }
}

let mapDispatchToProps = function(dispatch, ownProps) {
  return {
      dispatch: dispatch
  };
}

let mapStateToProps = function(state, ownProps) {
  return {
    store: state
  };
}

const connectHoc = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ConnectedCard = connectHoc(Card);

export default ConnectedCard;