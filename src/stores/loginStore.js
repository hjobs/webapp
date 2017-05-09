import Reflux from 'reflux';

// import Variable from '../services/var';
// import Http from '../services/http';

export const LoginActions = Reflux.createActions({
  toggleCustomLogin: {},
  toggleAgree: {}
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
        agreed: false
      }
    };
  }

  toggleCustomLogin() {
    const login = this.state.login;
    login.customLogin = !login.customLogin
    this.setState({login});
  }

  toggleAgree(val) {
    const login = this.state.login;
    login.agreed = val || !this.state.login.agreed;
    this.setState({login});
  }

}

export default LoginStore;
