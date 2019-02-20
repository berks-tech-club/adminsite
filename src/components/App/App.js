import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import ROUTES from '../../constants/routes.js';
import Navigation from '../Navigation/Navigation.js';
import Landing from '../Landing/Landing.js';
import Admin from '../Admin/Admin.js';
import Home from '../Home/Home.js';
import PasswordChange from '../PasswordChange/PasswordChange.js';
import PasswordForget from '../PasswordForget/PasswordForget.js';
import SignIn from '../SignIn/SignIn.js';
import SignOut from '../SignOut/SignOut.js';
import Account from '../Account/Account.js';

export class App extends Component {
  render() {
    return (
      <div>
          <Router>
              <Navigation></Navigation>
              <hr />

              <Route exact path={ROUTES.LANDING} components={Landing} />
              <Route exact path={ROUTES.ADMIN} components={Admin} />
              <Route exact path={ROUTES.HOME} components={Home} />
              <Route exact path={ROUTES.PASSWORD_CHANGE} components={PasswordChange} />
              <Route exact path={ROUTES.PASSWORD_FORGET} components={PasswordForget} />
              <Route exact path={ROUTES.SIGN_IN} components={SignIn} />
              <Route exact path={ROUTES.SIGN_OUT} components={SignOut} />
              <Route exact path={ROUTES.ACCOUNT} components={Account} />
          </Router>
      </div>
    )
  }
}

export default App
