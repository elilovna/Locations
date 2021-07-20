import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Content } from './components/Content';
import { DetailInfo } from './components/DetailInfo';
import './index.css';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/location/:id">
            <DetailInfo />
          </Route>
          <Route path="/" component={Content} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
