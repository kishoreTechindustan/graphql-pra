import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import './App.css';
import UserList from './components/UserList'
import CreateUser from './components/CreateUser'
import UserDetail from './components/UserDetail'
import EditUser from './components/EditUser'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/addUSer" component={CreateUser} />
          <Route exact path="/user/:id" component={UserDetail} />
          <Route exact path="/user/edit/:id" component={EditUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
