import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

// import Home from './Containers/Home/Home';
// import Browse from './Containers/Jobs/Browse';
// import Test from './Containers/Test/Test';

// import Variable from './services/var';
// import Http from './services/http';
// import Translation from './services/translation';

// import JobStore from './stores/jobStore';
// import TranslationStore from './stores/translationStore';

import React from 'react';
import Reflux from "reflux";
import {
  Route,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom';

import Home from './Containers/Home/Home';
import Browse from './Containers/Jobs/Browse';
import LoginPage from './Containers/LoginPage/LoginPage';
import ProfilePage from './Containers/Profile/ProfilePage';
const queryString = require("query-string");

import NavBar from './Components/NavBar/NavBar';

import JobStore from './stores/jobStore';
import UserStore, { UserActions } from './stores/userStore';
import TranslationStore, { TranslationActions } from './stores/translationStore';

// import Variable from '../services/var';
// import Http from './services/http';

class App extends Reflux.Component {
  constructor() {
    super();
    this.state = {};
    this.stores = [JobStore, TranslationStore, UserStore];
  }

  componentWillMount() {
    super.componentWillMount.call(this);

    const query = queryString.parse(this.props.location.search);
    if (!!query.auth_token) {
      localStorage.setItem("authToken", query.auth_token);
    }
    if (!!query.user) {
      const userObject = JSON.parse(query.user);
      console.log(["user data is here", userObject]);
      // window.setTimeout(() => { 
        UserActions.setUser(userObject, query.auth_token);
      // }, 300);
    }

    this.hideQuery();
  }

  hideQuery(props) {
    if (!props) props = this.props;

    /** @type {string} */
    const query = props.location.search;
    const regexs = {
      userRegex: /(\?user=|&user=)[^&]+/gi,
      authRegex: /(\?auth_token=|&auth_token=)[^&]+/gi
    };
    let nextQuery = query;

    for (const key in regexs) {
      if (regexs[key]) {
        nextQuery = nextQuery.replace(regexs[key], "");
      }
    }

    // replace URL
    if (nextQuery !== query) {
      const url = props.location.pathname + nextQuery;
      props.history.replace(url);
    }

  }

  handleSelect(eventKey) { if (!!eventKey) this.setState(eventKey, () => { window.scrollTo(0, 0); }); }

  changeUILang() {
    TranslationActions.setLocale(this.state.locale === "en" ? "zh-HK" : "en");
  }

  render() {
    // const query = queryString.parse(this.props.location.search),
          // shouldNotRoute = !!query.user || !!query.auth_token;
    // console.log([this.props, this.state]);
    return (
      <div style={{paddingTop: "50px"}}>
        <NavBar />
        <Switch>
          <Route path="/about" component={() => <Redirect to="/home" />} />
          <Route path="/jobs/:jobType" component={Browse} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={() => <Redirect to="/jobs/stable" />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
