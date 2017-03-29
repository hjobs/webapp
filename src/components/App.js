import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Home from './Home/Home';
import Browse from './Jobs/Browse';

import Variable from '../services/var';
import Http from '../services/http';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTab: 2,
      jobsTabViewType: 'quick',
      loading: {
        featured: true
      },
      jobs: {
        featured: [],
        quick: [],
        stable: [],
        internship: [],
        project: []
      }
    };
    this.http = new Http();
    this.vars = new Variable();
  }

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

  handleSelect(eventKey) { this.setState(eventKey, () => { window.scrollTo(0, 0); }); }

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

  render() {
    let content;
    switch (this.state.currentTab) {
      case 2: content =
        (<Browse
          viewType={this.state.jobsTabViewType}
          changeViewType={(str) => { this.changeJobsViewType(str); }}
        />);
        break;
      case 1: default:
        content =
          (<Home
            jobs={this.state.jobs.featured}
            loading={this.state.loading.featured}
            goToPage={(val, jobType) => { this.goToPage(val, jobType); }}
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
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem
                active={this.state.currentTab === 1}
                eventKey={{currentTab: 1}}
                href="#">
                Home
              </NavItem>
              <NavItem
                active={this.state.currentTab === 2}
                eventKey={{currentTab: 2, jobsTabViewType: 'quick'}}
                href="#">
                Jobs
              </NavItem>
            </Nav>
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
