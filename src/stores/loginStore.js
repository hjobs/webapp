import Reflux from 'reflux';

import { getTranslations } from './translationStore'

// import { getTStrings } from '../services/var';
// import Http from '../services/http';

export const LoginActions = Reflux.createActions({
  toggle: {},
  agreedMissingError: {}
});

class LoginStore extends Reflux.Store {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.listenables = LoginActions;
  }

  getInitialState() {
    return {
      login: {
        errorMsg: null,
        customLogin: false,
        agreed: false,
        isSignUp: true
      }
    };
  }

  /** @param {"agreed"|"customLogin"|"isSignUp"} key @param {boolean} val */
  toggle(key, val) {
    if (val === null || val === undefined) val = !this.state.login[key];
    const login = this.state.login;
    login[key] = val;
    this.setState({login});
  }

  agreedMissingError() {
    const login = this.state.login;
    login.errorMsg = getTranslations().login.agreeMissing;
    this.setState({login});
  }

}

export default LoginStore;
