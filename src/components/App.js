import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

import Home from './Home/Home';
import Jobs from './Jobs/Jobs';
import Projects from './Projects/Projects';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        currentTab: 1,
        jobsTabViewType: 'casual'
    };
  }

  handleSelect(eventKey) {
    this.setState(eventKey);
  }

  goToPage(val, jobsTabViewType) {
    const obj = {};
    obj.currentTab = val;
    if (jobsTabViewType) obj.jobsTabViewType = jobsTabViewType;
    this.setState(obj);
  }

  render() {
    let content;
    switch (this.state.currentTab) {
      case 2: content =
        (<Jobs
          viewType={this.state.jobsTabViewType}
        />);
        break;
      case 3:
        content = <Projects />;
        break;
      case 1: default:
        content =
          (<Home
            goToPage={(val, jobType) => { this.goToPage(val, jobType); }}
          />);
        break;
    }
    return (
      <div>
        <Navbar fluid onSelect={(eventKey) => this.handleSelect(eventKey)} inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a>
                <img
                  onClick={() => { this.handleSelect({currentTab: 1}); }}
                  src="./dist/images/logo-landscape.png" alt="HJobs"
                />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={{currentTab: 1}} href="#">Home</NavItem>
              <NavDropdown title="Jobs" id="nav-dropdown">
                <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'casual'}}>Quick Job</MenuItem>
                <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'stable'}}>Stable Job</MenuItem>
              </NavDropdown>
              <NavItem eventKey={{currentTab: 3}} href="#">Projects</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {content}
      </div>
    );
  }
}

export default App;
