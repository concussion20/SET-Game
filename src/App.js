import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import connectHoc from './Mappers';
import Rule from './Rule';
import Home from './Home';

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

const ConnectedApp = connectHoc(App);

export default ConnectedApp;
