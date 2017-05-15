import React from 'react';
import Reflux from "reflux";
import {
  Link,
  withRouter
} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './NavBar.css';

import Logo from './logo-landscape.png';

import TranslationStore, { TranslationActions } from '../../stores/translationStore';
import UserStore from '../../stores/userStore';

import Http from '../../services/http';

class NavBarWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {currentTab: 2};
    this.stores = [TranslationStore, UserStore];
  }

  handleSelect() { window.scrollTo(0, 0); }

  changeUILang() { TranslationActions.setLocale(this.state.locale === "en" ? "zh-HK" : "en"); }

  render() {
    const loggedIn = !!this.state.authToken,
          t = this.state.tStrings,
          urlPathname = this.props.location.pathname
    // console.log([this.props, this.state]);
    return (
      <div>
        <Navbar
          fluid inverse collapseOnSelect fixedTop
          onSelect={() => this.handleSelect(event)}
        >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">
                <img src={Logo} alt="HJobs" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <div
              id="uiLang"
              style={{float: "right", disply: "inline-block", padding: "15px", color: "#888"}}
              onClick={() => { this.changeUILang(); }}
            >
              <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
            </div>
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                active={/\/home/.test(urlPathname)}
                onClick={() => { this.props.history.push("/home"); }}
                href="#">
                <Link to="/home" className="navbar-link">{t.navbar.about}</Link>
              </NavItem>
              <NavItem
                active={/\/jobs\//.test(urlPathname)}
                onClick={() => { this.props.history.push("/jobs/stable"); }}
                href="#">
                <Link to="/jobs/stable" className="navbar-link">{t.navbar.viewJobs}</Link>
              </NavItem>
              <NavItem
                href="#"
                active={false}
                onClick={() => window.open("http://admin.hjobs.hk", "_self")}>
                {t.navbar.postJobs}
              </NavItem>
              <NavItem
                active={false}
                onClick={() => {
                  if (loggedIn) {
                    this.props.history.push("/profile");
                  }
                  else {
                    Http.log({
                      name: "Login",
                      action: "Click",
                      component: "Navbar"
                    });
                    this.props.history.push('/login');
                    // window.open(Http.baseUrl + "auth/google", "_self")
                  }
                }}>
                {loggedIn ? t.navbar.profile : t.misc.login}
              </NavItem>
              <NavItem
                active={false}
                onClick={() => { this.changeUILang(); }}
              >
                <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const NavBar = withRouter(NavBarWithoutRouter);

export default NavBar;
