import React from 'react';
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';

import Home from './Home/Home';
import Browse from './Jobs/Browse';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        currentTab: 1,
        jobsTabViewType: 'quick'
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
        (<Browse
          viewType={this.state.jobsTabViewType}
        />);
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
