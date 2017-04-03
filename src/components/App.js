import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Home from './Home/Home';
import Browse from './Jobs/Browse';

import Variable from '../services/var';
import Http from '../services/http';
import Translation from '../services/translation';

class App extends React.Component {
  constructor() {
    super();
    // if (!localStorage.getItem("uiLang")) localStorage.setItem("uiLang", "en");
    this.http = new Http();
    this.vars = new Variable();
    this.translation = new Translation();
    this.state = {
      currentTab: 2,
      jobsTabViewType: 'quick',
      // loading: {
      //   featured: true
      // },
      // deprecated, jobs are fetched in browse component
      // jobs: {
      //   featured: [],
      //   quick: [],
      //   stable: [],
      //   internship: [],
      //   project: []
      // },
      locale: this.translation.getLocale(),
      tStrings: this.translation.getTStrings()
    };
  }

  // deprecated, jobs are fetched in browse component
  // componentDidMount() { this.componentDidEnter(); }
  // componentDidEnter() {
  //   console.log("componentDidEnter in App.js");
  //   window.scrollTo(0, 0);
  //   this.http.request('jobs/get_picked').then(res => {
  //     if (!res.ok) return {error: true, errorMsg: res.statusText};
  //     return res.json();
  //   }).then(d => {
  //     if (!d || d.error) {
  //       this.setState(s => { s.loading.featured = false; });
  //       return;
  //     }
  //     this.setState(s => { s.jobs.featured = d; s.loading.featured = false; });
  //   }, err => console.log(err));
  // }

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
    this.http.log({name: "ChangeViewType", action: "Click", page: "Browse", component: "JobsSearchBar", target: str});
    this.setState(s => { s.jobsTabViewType = str; return s; }, () => { window.scrollTo(0, 0); });
  }

  changeUILang() {
    const locale = this.translation.getLocale() === "en" ? "zh-HK" : "en";
    this.translation.setLocale(locale);
    const tStrings = this.translation.getTStrings(locale);
    this.setState(s => { s.locale = locale; s.tStrings = tStrings; return s; }, () => {
      this.http.log({
        name: "change translation",
        action: locale,
        component: "navbar"
      });
    });
  }

  render() {
    let content;
    switch (this.state.currentTab) {
      case 2: content =
        (<Browse
          viewType={this.state.jobsTabViewType}
          changeViewType={(str) => { this.changeJobsViewType(str); }}
          t={this.state.tStrings}
        />);
        break;
      case 1: default:
        content =
          (<Home
            // deprecated, jobs are fetched in browse component
            // jobs={this.state.jobs.featured}
            // loading={this.state.loading.featured}
            goToPage={(val, jobType) => { this.goToPage(val, jobType); }}
            t={this.state.tStrings}
          />);
        break;
    }
    return (
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
            <div id="uiLang" style={{float: "right", disply: "inline-block", padding: "15px", color: "#888"}} onClick={() => { this.changeUILang(); }}>
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
                eventKey={{currentTab: 2, jobsTabViewType: 'quick'}}
                href="#">
                {this.state.tStrings.navbar.viewJobs}
              </NavItem>
              <NavItem
                active={false}
                onClick={() => window.open("http://admin.hjobs.hk")}>
                {this.state.tStrings.navbar.postJobs}
              </NavItem>
            </Nav>
            <Navbar.Text pullRight onClick={() => { this.changeUILang(); }}>
              <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        {content}
      </div>
    );
  }
}

export default App;

              // <NavDropdown title="Jobs" id="nav-dropdown">
              //   <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'quick'}}>Quick Job</MenuItem>
              //   <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'stable'}}>Stable Job</MenuItem>
              // </NavDropdown>
