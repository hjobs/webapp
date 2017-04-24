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
import UserStore from '../../stores/userStore';

// import Http from './services/http';

class NavBarWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {currentTab: 2};
    this.stores = [TranslationStore, UserStore];
  }

  handleSelect(eventKey) { if (!!eventKey) this.setState(eventKey, () => { window.scrollTo(0, 0); }); }

  changeUILang() {
    TranslationActions.setLocale(this.state.locale === "en" ? "zh-HK" : "en");
  }

  render() {
    // console.log([this.props, this.state]);
    return (
      <div>
        <Navbar
          fluid inverse collapseOnSelect fixedTop
          onSelect={(eventKey) => this.handleSelect(eventKey)}
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
                active={this.state.currentTab === 1}
                eventKey={{currentTab: 1}}
                href="#"
                onClick={() => { this.props.history.replace('/home') }}>
                {this.state.tStrings.navbar.about}
              </NavItem>

              <NavItem
                active={this.state.currentTab === 2}
                eventKey={{currentTab: 2, jobsTabViewType: "stable"}}
                href="#"
                onClick={() => { this.props.history.replace('/jobs/stable') }}>
                {this.state.tStrings.navbar.viewJobs}
              </NavItem>
              <NavItem
                active={false}
                onClick={() => window.open("http://admin.hjobs.hk")}>
                {this.state.tStrings.navbar.postJobs}
              </NavItem>
            </Nav>
            <Navbar.Text
              pullRight
              onClick={() => { this.changeUILang(); }}
            >
              <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
            </Navbar.Text>
            <Navbar.Text
              pullRight
            >
              <span>Login</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const NavBar = withRouter(NavBarWithoutRouter);

export default NavBar;
