import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//import HomePage from './homePage';
import HomePage from './newHomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
