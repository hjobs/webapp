/** @typedef {'quick'|'stable'|'internship'|'project'} JobType */

import React from 'react';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';
import './LoginPage.css';

import Login from '../../Components/Login/Login';

import UserStore from '../../stores/userStore';
import TranslationStore from '../../stores/translationStore';

class LoginPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore, TranslationStore];
    this.storeKeys = ["user", "authToken", "locale"];
    this.tStrings = {
      "en": {
        postJob: "Post job? Click here!"
      },
      "zh-HK": {
        postJob: "想刑登工作？按這裡!"
      }
    }
  }

  render() {
    if (!!this.state.authToken && !!this.state.user) return <Redirect to="/jobs/stable" />;
    const tStrings = this.tStrings[this.state.locale];

    return (
      <div className="flex-col flex-vhCenter login-page-container">
        <div className="login-container" style={{fontSize: "16px"}}>
          <Login />
        </div>
        <a
          href="https://admin.hjobs.hk"
          target="_blank"
        >
          <button
            style={{
              padding: 12,
              border: 0,
              borderRadius: 3,
              color: "black",
              fontSize: 16
            }}
          >
            {tStrings.postJob}
          </button>
        </a>
      </div>
    );
  }
}

export default LoginPage;
