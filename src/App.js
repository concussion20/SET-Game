import React from 'react';
// import ReactDOM from 'react-dom';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
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
    // console.log(props)
    // store.dispatch({type: 'ADD', value: 9});
    // console.log(store.getState())
    console.log(props)
  }

  // add() {
  //   this.props.dispatch({type: 'ADD', value: 9});
  //   // this.props.name = "Chang2";
  // }

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
    // console.log(store.getState())
    console.log(this.props)
    // if (this.props.view == 'newGame') {
    //   return (
    //     <div>
    //       <h2>New SET Game</h2>
    //       <button onClick={() => this.add()}>Easy</button>
    //       <button onClick={() => this.add()}>Meidum</button>
    //       <button onClick={() => this.add()}>Hard</button>
    //     </div>
    //   );
    // } else {
    //   return null;
    // }

    return (
      <Router>
        <div id='app'>
          <nav className='navbar'>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/rules">Rules</Link>
              </li>
            </ul>
          </nav>

          <Route path="/SET/*">
            <div className='buttons'>
              <button onClick={() => this.newGame()}>New Game</button>
              <button onClick={() => this.open3Cards()}>Open 3 Cards</button>
              <button onClick={() => this.findSet()}>Find Set</button>
            </div>
          </Route>          

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/rules">
              <Rule />
            </Route>
            <Route path="/" component={Home} />
              {/* <div>
                <h2>New SET Game</h2>
                <div className='diffic-options'>
                  <ul>
                    <li>
                      <Link to="/SET/easy">Easy</Link>
                    </li>
                    <li>
                      <Link to="/SET/medium">Medium</Link>
                    </li>
                    <li>
                      <Link to="/SET/hard">Hard</Link>
                    </li>
                  </ul>
                </div>
              </div> */}
            {/* <Route path="/SET/easy">
              <ConnectedGame difficulty='easy' />
            </Route>
            <Route path="/SET/medium">
              <ConnectedGame difficulty='medium' />
            </Route>
            <Route path="/SET/hard">
              <ConnectedGame difficulty='hard' />
            </Route> */}
          </Switch>
        </div>
      </Router>
    );


      // return (
      //     <div>
      //         <button onClick={() => this.add()}>Roll Dice</button>
      //         <button onClick={() => this.clear()}>Clear Dice</button>
      //         <h4>Sum: {this.props.count} </h4>
      //         <div id="dices">
      //           {this.props.diceLst.map(diceVal => (
      //             <Dice value={diceVal}/>
      //           ))}
      //         </div>
      //     </div>
      // );
  }
}

// function Home() {
//   console.log("home")

//   // let match = useRouteMatch();
//   console.log(this.props.location.pathname);
//   return (
//     <div>
//       {this.props.location.pathname == '/' && 
//         <div>
//           <h2>New SET Game</h2>
//           <div className='diffic-options'>
//             <ul>
//               <li>
//                 <Link to="/SET/easy">Easy</Link>
//               </li>
//               <li>
//                 <Link to="/SET/medium">Medium</Link>
//               </li>
//               <li>
//                 <Link to="/SET/hard">Hard</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       }

//       <Switch>
//         <Route path="/SET/easy">
//           <ConnectedGame difficulty='easy' />
//         </Route>
//         <Route path="/SET/medium">
//           <ConnectedGame difficulty='medium' />
//         </Route>
//         <Route path="/SET/hard">
//           <ConnectedGame difficulty='hard' />
//         </Route>
//       </Switch>
//     </div>
//   );
// }

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("home")
    // store.dispatch({type: 'ADD', value: 10});
    // console.log(store.getState())
    console.log(props)
    // load game board
    // props.dispatch({type: "LOAD_GAME", difficulty: props.difficulty});
  }

  // handleOptionClick(difficulty) {
  //   this.props.dispatch({type: "LOAD_GAME", difficulty: difficulty});
  // }

  render() {
    console.log("Home render")
    // console.log(store.getState())
    console.log(this.props)
    return (
      // <div className={`${this.props.location.pathname === '/' ? 'content' : ''}`}>
      <div className='content'>
        {this.props.location.pathname === '/' && 
          <div>
            <h2 className='new-game'>New SET Game</h2>
            <div className='diffic-options'>
              <ul>
                <li>
                  <Link to="/SET/easy">Easy</Link>
                </li>
                <li>
                  <Link to="/SET/medium">Medium</Link>
                </li>
                <li>
                  <Link to="/SET/hard">Hard</Link>
                </li>
              </ul>
            </div>
          </div>
        }

        {/* {
          this.props.location.pathname !== '/' && 
          <div className='buttons'>
            <button >Open 3 Cards</button>
            <button >Find Set</button>
          </div>
        } */}
        
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
      // return (
      //     <div>
      //         <button onClick={() => this.add()}>Roll Dice</button>
      //         <button onClick={() => this.clear()}>Clear Dice</button>
      //         <h4>Sum: {this.props.count} </h4>
      //         <div id="dices">
      //           {this.props.diceLst.map(diceVal => (
      //             <Dice value={diceVal}/>
      //           ))}
      //         </div>
      //     </div>
      // );
  }
}

function Rule() {
  return (
    <div className='content'>
      <h2>Rules</h2>
      <ol>
        <li>

        </li>
        <li>
          
        </li>
        <li>
          
        </li>
        <li>
          
        </li>
      </ol>
    </div>
  );
}

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

// function Topics() {
//   let match = useRouteMatch();
//   console.log( match);

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }

class Game extends React.Component {
  constructor(props) {
    super(props);
    console.log("game")
    // store.dispatch({type: 'ADD', value: 10});
    // console.log(store.getState())
    console.log(props)
    // load game board
    props.dispatch({type: "LOAD_GAME", difficulty: props.difficulty});
  }

  handleClick() {
    if (this.props.isSelected === 'false') {
      // this.setState({isSelected: !(this.props.store.selected.length === 2)});
      this.props.dispatch({type: "SELECT_CARD", id: this.props.id});
    } else {
      // this.setState({isSelected: false});
      this.props.dispatch({type: "DESELECT_CARD", id: this.props.id});
    }
  }

  // add() {
  //   this.props.dispatch({type: 'ADD', value: 10});
  // }

  render() {
    console.log("Game render")
    // console.log(store.getState())
    console.log(this.props)
    // console.log(this.props.store.shownCards.length)
    let msgColor = this.props.store.isMatch === 'yes' ? 'green' : 'red';
    let msg = this.props.store.isMatch === 'empty' ? '' : this.props.store.isMatch === 'no' ? "Cards don't match!" :
      (this.props.store.leftCards.length === 0 && this.props.store.shownCards.length === 0) ? 'You win!!' : 'Cards match!';
    return (
      <div>
        <div className='cards'>
          {this.props.store.shownCards}
        </div>
        <div className={msgColor}>
          {msg}
        </div>
      </div>
    );
      // return (
      //     <div>
      //         <button onClick={() => this.add()}>Roll Dice</button>
      //         <button onClick={() => this.clear()}>Clear Dice</button>
      //         <h4>Sum: {this.props.count} </h4>
      //         <div id="dices">
      //           {this.props.diceLst.map(diceVal => (
      //             <Dice value={diceVal}/>
      //           ))}
      //         </div>
      //     </div>
      // );
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
// const ConnectedHome = connectHoc(Home);
const ConnectedGame = connectHoc(Game);

// connectHoc(Card);
// export default connectHoc(App);

export default ConnectedApp;

// const element = <Game name="Sara" />;
// const element = <Game/>;

// ReactDOM.render(
//   element,
//   document.getElementById('root2')
// );
