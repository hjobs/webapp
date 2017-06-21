/** @typedef {'quick'|'stable'|'internship'|'project'} JobType */

import React from 'react';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import './LoginPage.css';
import Theme from '../../styles/theme';

import Login from '../../Components/Login/Login';

import UserStore from '../../stores/userStore';
import TranslationStore from '../../stores/translationStore';

const Well = (props) => (
  <div
    style={{
      backgroundColor: Theme.colors.offWhite,
      // border: "3px solid " + Theme.colors.yellow,
      borderRadius: "50%",
      // boxShadow: "0 0 15px " + Theme.colors.offWhite,
      cursor: "pointer",
      color: Theme.colors.black,
      fontSize: 18,
      fontWeight: 400,
      margin: 15,
      width: 200,
      height: 200
    }}
    className="flex-row flex-vhCenter"
    {...props}
  />
);

const Button = (props) => (
  <button
    style={{
      backgroundColor: "transparent",
      border: "1px solid " + Theme.colors.lightGray,
      borderRadius: 5,
      boxShadow: "none",
      color: Theme.colors.lightGray,
      padding: 10
    }}
    {...props}
  />
)

class LoginPage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: "undecided"
    }
    this.stores = [UserStore, TranslationStore];
    this.storeKeys = ["user", "authToken", "locale"];
    this.tStrings = {
      "en": {
        postJob: "Login as Business",
        jobSeekers: "Login as Individual"
      },
      "zh-HK": {
        postJob: "想刑登工作？按這裡!",
        jobSeekers: "我想找工作"
      }
    }
  }

  render() {
    if (!!this.state.authToken && !!this.state.user) return <Redirect to="/jobs/stable" />;
    const tStrings = this.tStrings[this.state.locale];

    return (
      <div className="flex-col flex-vhCenter login-page-container">
        {
          this.state.sign === "undecided" ?
          <div style={{textAlign: "center"}}>
            <Button onClick={() => this.setState(s => {
              s.sign = "jobSeeker";
              return s;
            })}>
              <i style={{marginRight: 7}} className="fa fa-user" aria-hidden="true" />
              {tStrings.jobSeekers}
            </Button>
            <br /><br />
            <a href="https://admin.hjobs.hk" target="_blank">
              <Button>
                <i style={{marginRight: 7}} className="fa fa-building" aria-hidden="true" />
                {tStrings.postJob}
              </Button>
            </a>
          </div>
          :
          <div className="login-container" style={{fontSize: "16px"}}>
            <div style={{color: Theme.colors.offWhite, marginBottom: 15}}>
              <span
                style={{cursor: "pointer"}}
                onClick={() => this.setState(s => {
                  s.sign = "undecided";
                  return s;
                })}
              >
                <i style={{marginRight: 7}} className="fa fa-chevron-left" aria-hidden="true" />
                Back
              </span>
            </div>
            <Login />
          </div>
        }
      </div>
    );
  }
}

export default LoginPage;
