import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import ConnectedGame from './Game';

export default class Home extends React.Component {
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