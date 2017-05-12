/** @typedef {'quick'|'stable'|'internship'|'project'} JobType */

import React from 'react';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';

import Login from '../../Components/Login/Login';

import UserStore from '../../stores/userStore';

// import Variable from '../../services/var';

class LoginPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = UserStore;
  }

  render() {
    if (!!this.state.authToken && !!this.state.user) return <Redirect to="/jobs/stable" />;
    return (
      <div className="flex-col flex-vhCenter login-page-container">
        <div className="login-container" style={{fontSize: "16px"}}>
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginPage;
