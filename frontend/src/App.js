import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Home.js';
import NotFound from './NotFound.js';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-header">
          <h1>EASY URL</h1>
        </nav>
        <Switch>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
