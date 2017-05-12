import React from 'react';
import Reflux from 'reflux';
// import Variable from '../../services/var';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Checkbox } from 'semantic-ui-react';
import Field from '../Utilities/SemanticFormField';
import './styles/SignupForm.css';

import Http from '../../services/http';

import LoginStore, { LoginActions } from '../../stores/loginStore';
import UserStore, { UserActions } from '../../stores/userStore';
import TranslationStore from '../../stores/translationStore';

const loginFormFields = [
  {
    key: 'name',
    // label: "Name",
    placeholder: "Your name"
  },
  {
    key: "email",
    // label: "Email"
    placeholder: "Your Email"
  },
  {
    type: "password",
    key: "password",
    // label: "Password"
    placeholder: "Password"
  }
]

class SignupForm extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.stores = [UserStore, LoginStore, TranslationStore];
  }

  getInitialState() {
    return {
      loading: false,
      loginForm: this.getInitialForm(),
      errors: []
    }
  }

  getInitialForm() {
    return {
      name: "",
      email: "",
      password: ""
    }
  }

  /** @return {string[]} */
  loginFormErrors() {
    const form = this.state.loginForm,
          t = this.state.tStrings;
    const err = [];
    ['name', 'email', 'password'].forEach(key => {
      if (key === "name" && !this.state.login.isSignUp) return;
      if (!form[key]) err.push(t.login[key + "Missing"]);
    })
    if (!err || err.length === 0) {
      if (
        form.email.split("@").length !== 2 ||
        form.email.split(".").length < 2
      ) err.push(t.login.emailNotValid);
    }
    if (this.state.login.isSignUp && !this.state.login.agreed) err.push(t.login.missingAgree);
    console.log(["err", err]);
    this.setState(s => {
      s.errors = err;
      return s;
    })
    return err;
  }

  toggleSignInUp() {
    LoginActions.toggle("isSignUp");
  }

  handleChange(key, value) {
    if (key !== "password") UserActions.updateUser(key, value);
    this.setState(s => {
      s.loginForm[key] = value;
      return s;
    });
  }

  customLogin() {
    const errors = this.loginFormErrors();
    const onError = (reason) => {
      console.log(reason);
      this.setState(s => {
        s.errors = [reason]
      })
    }
    if (!errors || errors.length === 0) {
      const url = this.state.login.isSignUp ? "employees" : "authenticate",
            method = "POST",
            obj = this.state.login.isSignUp ? {
                    employee: this.state.loginForm
                  } : {
                    email: this.state.loginForm.email,
                    password: this.state.loginForm.password
                  };
      Http.request(url, method, obj).then(res => res.json()).then(d => {
        if (!!d && d.employee && d.auth_token) {
          UserActions.setUser(d.employee, d.auth_token);
        } else {
          onError("Invalid credentials");
        }
      }).catch(err => onError("Invalid credentials"));
    }
  }

  cancel() {
    UserActions.removeTemporaryUser();
    this.setState(s => {
      s.loginForm = this.getInitialForm();
      return s;
    }, () => LoginActions.toggle("customLogin"))
  }

  toggleCustomLogin() { LoginActions.toggle("customLogin"); }

  renderForm() {
    const form = this.state.loginForm,
          t = this.state.tStrings;
    return (
      <Form loading={this.state.loading} inverted>
        <p
          className="link text-right"
          onClick={() => this.toggleSignInUp()}
        >
          {this.state.login.isSignUp ? t.login.signInHere : t.login.signUpHere}
        </p>
        {
          loginFormFields.map(field => {
            if (!this.state.login.isSignUp && field.key === "name") return null;
            return (
              <Field
                key={'signup-form-' + field.key}
                label={field.label || null}
                placeholder={field.placeholder || null}
                value={form[field.key] || ""}
                type={field.type || null}
                control={field.control || null}
                handleChange={(val) => { this.handleChange(field.key, val); }}
              />
            )
          })
        }
        <p className="text-red text-center">
          {
            this.state.errors.reduce((dom, curr, i, arr) => {
              dom.push(
                <span key={'login-form-errors-' + i}>{curr}</span>
              );
              if (i < (arr.length - 1)) dom.push(
                <br key={'loginformbreaker' + i} />
              );
              return dom;
            }, [])
          }
        </p>
        <div className="flex-row flex-vhCenter button-group">
          <Form.Button
            type="button"
            onClick={() => this.cancel()}
            content="Cancel"
          />
          <Form.Button
            type="button"
            onClick={() => this.customLogin()}
            content="Submit"
          />
        </div>

      </Form>
    )
  }

  render() {
    const t = this.state.tStrings;
    return (
      <div className="full-width flex-col flex-vhCenter" style={{minHeight: "50px", padding: "15px"}}>
        <div style={{maxWidth: "400px"}}>
          {
            !this.state.login.customLogin ?
              <p
                style={{color: "#888"}}
              >
                {t.login.custom1}
                <span
                  style={{cursor: "pointer", textDecoration: "underline"}}
                  onClick={() => this.toggleCustomLogin()}
                >{t.login.custom2}
                </span>
              </p>:
              this.renderForm()
          }
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
