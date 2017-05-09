import React from 'react';
import Reflux from 'reflux';
// import Variable from '../../services/var';
import { withRouter } from 'react-router-dom';
// import { Checkbox } from 'semantic-ui-react';
import { Grid, Row, Col } from 'react-bootstrap';
import './styles/Login.css';

import LoginStore, { LoginActions } from '../../stores/loginStore';
import TranslationStore from '../../stores/translationStore';

import LoginButtons from './LoginButtons';
import SignupForm from './SignupForm';

class Login extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [LoginStore, TranslationStore];
  }

  toggleCustomLogin() {
    LoginActions.toggleCustomLogin();
  }

  render() {
    return (
      <Grid fluid className="full-width">
        <Row>
          <Col hidden={this.state.login.customLogin} xs={12} md={6}>
            <LoginButtons
              disabled={!this.state.agreed}
            />
          </Col>
          <Col xs={12} md={this.state.login.customLogin ? 12 : 6}>
            <div>
              <SignupForm />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Login);
