import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("App")
    console.log(props)
  }

  newGame() {
    this.props.dispatch({type: "LOAD_GAME", difficulty: this.props.store.difficulty});
  }

  open3Cards() {
    this.props.dispatch({type: "OPEN_3_CARDS"});
  }

  findSet() {
    this.props.dispatch({type: "FIND_SET"});
  }

  render() {
    console.log("App render")
    console.log(this.props)

    return (
      <Router>
        <div id='app' className="grid grid-cols-6 gap-4">
          <div className="flex flex-wrap py-2 col-span-6">
            <div className="w-full px-4">
              <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-indigo-500 rounded">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                  <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                    <Link to="/" className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
                      SET Game Menu
                    </Link>
                    <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                      <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                      <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                      <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    </button>
                  </div>
                  <div className="flex lg:flex-grow items-center" id="example-navbar-info">
                    <ul className="flex flex-col lg:flex-row list-none ml-auto">
                      <li className="nav-item">
                        <Link to="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/rules" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                          Rules
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          <Route path="/SET/*">
            <div className='buttons col-start-2 col-span-1'>
              <button onClick={() => this.newGame()} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                New Game
              </button>
              <button onClick={() => this.open3Cards()} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Open 3 Cards
              </button>
              <button onClick={() => this.findSet()} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                Find Set
              </button>
            </div>
          </Route>          

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/rules">
              <Rule />
            </Route>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("home")
    console.log(props)
  }

  render() {
    console.log("Home render")
    console.log(this.props)
    return (
      // <div className={`${this.props.location.pathname === '/' ? 'content' : ''}`}>
      <div className={`content ${this.props.location.pathname === '/' ? 'col-span-6' : 'col-span-4'}`}>
        {this.props.location.pathname === '/' && 
          <div>
            <h2>New SET Game</h2>
            <div className='diffic-options'>
              <ul>
                <li>
                  <Link to="/SET/easy" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Easy
                  </Link>
                </li>
                <li>
                  <Link to="/SET/medium" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Medium
                  </Link>
                </li>
                <li>
                  <Link to="/SET/hard" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Hard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        }
        
        <Switch>
          <Route path="/SET/easy">
            <ConnectedGame difficulty='easy' />
          </Route>
          <Route path="/SET/medium">
            <ConnectedGame difficulty='medium' />
          </Route>
          <Route path="/SET/hard">
            <ConnectedGame difficulty='hard' />
          </Route>
        </Switch>
      </div>
    );
  }
}

function Rule() {
  return (
    <div className='content col-start-2 col-span-4'>
      <h2>Rules</h2>
      <br />
      <p>
        The object of the game is to identify a 'Set' of three cards from 12 cards laid out on the table. Each card has a variation of the following four features:
      </p>
      <ol className='list-decimal'>
        <li>
          COLOR: Each card is red, green, or blue.
        </li>
        <li>
          SYMBOL: Each card contains ovals, squiggles, or diamonds.
        </li>
        <li>
          NUMBER: Each card has one, two, or three symbols.
        </li>
        <li>
          SHADING: Each card is solid, open, or striped.
        </li>
      </ol>
      <p>
        A 'Set' consists of three cards in which each feature is EITHER the same on each card OR is different on each card. That is to say, any feature in the 'Set' of three cards is either common to all three cards or is different on each card.
      </p>
      <br />
      <img src='/images/rules_examples.jpg' alt='' />
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log("game")
    console.log(props)
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
    console.log("Game render")
    console.log(this.props)
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

const ConnectedApp = connectHoc(App);
const ConnectedGame = connectHoc(Game);

export default ConnectedApp;
