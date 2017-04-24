// import React from 'react';
import Reflux from 'reflux';
// import { withRouter, matchPath } from 'react-router-dom';
// const queryString = require("query-string");

import Http from '../services/http';

export const UserActions = Reflux.createActions([
  'refreshUser',
  'logout',
  'setUser'
]);

class UserStore extends Reflux.Store {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.listenables = UserActions;
    // if (!!this.getAuthToken()) { this.getUserFromAuthToken(); }
  }

  getInitialState() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      appliedJobs: JSON.parse(localStorage.getItem('appliedJobs'))
    };
  }

  getAuthToken() { return localStorage.getItem("authToken"); }
  setAuthToken(val) { localStorage.setItem("authToken", val) }

  refreshUser() { this.getUserFromAuthToken(); }

  setUser(userObject) {
    if (this.userObjectIsValid(userObject)) {
      localStorage.setItem("user", JSON.stringify(userObject));
      // console.log("just localStorage.setItem('user', JSON.stringify(userObject));, and logging userObject", userObject)
      this.setState(s => {
        s.user = userObject;
        return s;
      });
    }
  }

  getUserFromAuthToken() {
    Http.request('get_employee').then(res => res.json()).then(d => {
      if (!!d && !d.error) {
        this.setAuthToken(d.auth_token);
        this.setUser(d.user);
      }
    })
  }

  userObjectIsValid(userObject) {
    return !!userObject;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("appliedJobs");
    sessionStorage.removeItem("user_id");
    this.setState(this.getInitialState());
  }
}

export default UserStore;
