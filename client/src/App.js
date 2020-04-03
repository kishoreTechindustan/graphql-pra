import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList'
import CreateUser from './components/CreateUser'
import UserDetail from './components/UserDetail'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={UserList}
          />
          <Route
            exact
            path="/addUSer"
            component={CreateUser}
          />
          <Route
            exact
            path="/user/:id"
            component={UserDetail}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
