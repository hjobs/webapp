import React from 'react';
import Reflux from "reflux";
import {
  // BrowserRouter as Router
  // Route,
  // Redirect
  Link,
  withRouter
} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/main.css';
import Logo from './logo-landscape.png';

import TranslationStore, { TranslationActions } from '../../stores/translationStore';
import UserStore, { UserActions } from '../../stores/userStore';

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
    const loggedIn = !!this.state.user,
          t = this.state.tStrings,
          urlPathname = this.props.location.pathname
    // console.log([this.props, this.state]);
    return (
      <div>
        <Navbar
          fluid inverse collapseOnSelect fixedTop
          onSelect={() => this.handleSelect()}
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
                href="#"
                onClick={() => { this.props.history.push('/home') }}>
                {t.navbar.about}
              </NavItem>

              <NavItem
                active={/\/jobs\//.test(urlPathname)}
                href="#"
                onClick={() => { this.props.history.push('/jobs/stable') }}>
                {t.navbar.viewJobs}
              </NavItem>
              <NavItem
                active={false}
                onClick={() => window.open("http://admin.hjobs.hk")}>
                {t.navbar.postJobs}
              </NavItem>
              <NavItem
                active={false}
                onClick={() => { this.changeUILang(); }}
              >
                <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
              </NavItem>
              <NavItem
                active={false}
                onClick={() => {
                  if (loggedIn) {
                    Http.log({
                      name: "Logout",
                      action: "Click",
                      component: "Navbar"
                    });
                    UserActions.logout();
                  }
                  else window.open(Http.baseUrl + "auth/google", "_self")
                }}>
                {loggedIn ? t.misc.logout : t.misc.login}
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
