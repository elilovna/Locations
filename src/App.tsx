import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { Content } from './components/Content';
import { DetailInfo } from './components/DetailInfo';
import { Front } from './components/Front';
import './index.css';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<
    number | undefined
  >();

  return (
    <Router>
      <div>
        <nav className="bg-gray-50 p-4 shadow-md">
          <ul className="flex flex-row text-sm">
            <li>
              <NavLink
                to="/home"
                activeClassName="border-b-2 border-gray-400 font-bold"
                className="p-4"
              >
                Home
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/content"
                activeClassName="border-b-2 border-gray-400 font-bold"
                className="p-4"
              >
                Content
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/content/info/:id">
            <DetailInfo />
          </Route>
          <Route path="/content">
            {' '}
            <Content />
          </Route>
          <Route path="/" component={Front} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
