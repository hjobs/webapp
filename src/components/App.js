import React from 'react';
import Reflux from "reflux";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Home from './Home/Home';
import Browse from './Jobs/Browse';

import JobStore from '../stores/jobStore';
import TranslationStore, { TranslationActions } from '../stores/translationStore';

// import Variable from '../services/var';
import Http from '../services/http';

class App extends Reflux.Component {
  constructor() {
    super();
    this.state = {};
    this.stores = [JobStore, TranslationStore];
  }

  handleSelect(eventKey) { if (!!eventKey) this.setState(eventKey, () => { window.scrollTo(0, 0); }); }

  goToPage(val, jobsTabViewType) {
    const obj = {};
    obj.currentTab = val;
    if (jobsTabViewType) obj.jobsTabViewType = jobsTabViewType;
    this.setState(obj, () => { window.scrollTo(0, 0); });
  }
  /** @param {'quick'|'stable'|'internship'|'project'} str */
  changeJobsViewType(str) {
    if (str === this.state.jobsTabViewType) return;
    Http.log({name: "ChangeViewType", action: "Click", page: "Browse", component: "JobsSearchBar", target: str});
    this.setState(s => { s.jobsTabViewType = str; return s; }, () => { window.scrollTo(0, 0); });
  }

  changeUILang() {
    TranslationActions.setLocale(this.state.locale === "en" ? "zh-HK" : "en");
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar
            fluid inverse collapseOnSelect fixedTop
            onSelect={(eventKey) => this.handleSelect(eventKey)}
          >
            <Navbar.Header>
              <Navbar.Brand>
                <a onClick={() => { this.handleSelect({currentTab: 1}); }}>
                  <img src="./resources/logo-landscape.png" alt="HJobs" />
                </a>
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
                  href="#">
                  {this.state.tStrings.navbar.about}
                </NavItem>
                <NavItem
                  active={this.state.currentTab === 2}
                  eventKey={{currentTab: 2, jobsTabViewType: "stable"}}
                  href="#">
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
                // onClick={() => { this.changeUILang(); }}
              >
                <a href="http://dev.hjobs.hk:9080/auth/google">Login</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/" component={() => <Redirect to="/jobs/stable" />} />
          <Route path="/jobs/:job_type" component={Browse} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.any
};

export default App;

              // <NavDropdown title="Jobs" id="nav-dropdown">
              //   <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'quick'}}>Quick Job</MenuItem>
              //   <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'stable'}}>Stable Job</MenuItem>
              // </NavDropdown>
