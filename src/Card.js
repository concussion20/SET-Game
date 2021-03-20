import React from 'react';
import {connect} from 'react-redux';
import './Card.css';

// import diamond_open_blue from './images/diamond_open_blue.png';
// import diamond_open_green from './images/diamond_open_green.png';
// import diamond_open_red from './images/diamond_open_red.png';
// import diamond_solid_blue from './images/diamond_solid_blue.png';
// import diamond_solid_green from './images/diamond_solid_green.png';
// import diamond_solid_red from './images/diamond_solid_red.png';
// import diamond_striped_blue from './images/diamond_striped_blue.png';
// import diamond_striped_green from './images/diamond_striped_green.png';
// import diamond_striped_red from './images/diamond_striped_red.png';
// import oval_open_blue from './images/oval_open_blue.png';
// import oval_open_green from './images/oval_open_green.png';
// import oval_open_red from './images/oval_open_red.png';
// const oval_open_red = require('./images/oval_open_red.png');
// import oval_solid_blue from './images/oval_solid_blue.png';
// import oval_solid_green from './images/oval_solid_green.png';
// import oval_solid_red from './images/oval_solid_red.png';
// import oval_striped_blue from './images/oval_striped_blue.png';
// import oval_striped_green from './images/oval_striped_green.png';
// import oval_striped_red from './images/oval_striped_red.png';
// import squiggle_open_blue from './images/squiggle_open_blue.png';
// import squiggle_open_green from './images/squiggle_open_green.png';
// import squiggle_open_red from './images/squiggle_open_red.png';
// import squiggle_solid_blue from './images/squiggle_solid_blue.png';
// import squiggle_solid_green from './images/squiggle_solid_green.png';
// import squiggle_solid_red from './images/squiggle_solid_red.png';
// import squiggle_striped_blue from './images/squiggle_striped_blue.png';
// import squiggle_striped_green from './images/squiggle_striped_green.png';
// import squiggle_striped_red from './images/squiggle_striped_red.png';

export const COLORS = ['blue', 'green', 'red'];
export const NUMBERS = [1, 2, 3];
export const SHADINGS = ['open', 'solid', 'striped'];
export const SHAPES = ['diamond', 'oval', 'squiggle'];

class Card extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // console.log("Card");
  //   // console.log(props);
  //   // this.state = {isSelected: false};
  // }  

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
      // this.setState({isSelected: !(this.props.store.selected.length === 2)});
      this.props.dispatch({type: "SELECT_CARD", id: this.props.id});
    } else {
      // this.setState({isSelected: false});
      this.props.dispatch({type: "DESELECT_CARD", id: this.props.id});
    }
  }


  // getId() {
  //   return this.props.key;
  // }

  // getColor() {
  //   return this.props.color;
  // }

  // getShape() {
  //   return this.props.shape;
  // }

  // getShading() {
  //   return this.props.shading;
  // }

  // getNumber() {
  //   return this.props.number;
  // }

  render() {
    // console.log("Card render");
    // console.log(this.props);
    // console.log(this.props.isSelected)
    // let isSelected;
    // for (let ) {

    // }
    // console.log(this.props.store.selected)
    // console.log(this)
    // console.log(this.props.store.selected.includes(this))
    // console.log(this.props.store.selected.indexOf(this))
    return (
      <div className={`card ${this.checkIsFinded() ? 'finded' : this.checkIsSelected() ? 'selected' : ''}`} onClick={() => this.handleClick()}>
          {[...Array(parseInt(this.props.number, 10))].map((_, i) =>
            // <img key={i} src={'./images/oval_open_red.png'} alt='' />
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