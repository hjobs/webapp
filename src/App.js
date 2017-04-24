import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

// import Home from './Pages/Home/Home';
// import Browse from './Pages/Jobs/Browse';
// import Test from './Pages/Test/Test';

// import Variable from './services/var';
// import Http from './services/http';
// import Translation from './services/translation';

// import JobStore from './stores/jobStore';
// import TranslationStore from './stores/translationStore';

import React from 'react';
import Reflux from "reflux";
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';

import Home from './Pages/Home/Home';
import Browse from './Pages/Jobs/Browse';
const queryString = require("query-string");

import NavBar from './Components/NavBar/NavBar';

import JobStore from './stores/jobStore';
import UserStore, { UserActions } from './stores/userStore';
import TranslationStore, { TranslationActions } from './stores/translationStore';

// import Variable from '../services/var';
// import Http from './services/http';

class App extends Reflux.Component {
  constructor() {
    super();
    this.state = {};
    this.stores = [JobStore, TranslationStore, UserStore];
  }

  componentWillMount() {
    super.componentWillMount.call(this);

    const query = queryString.parse(this.props.location.search);
    if (!!query.auth_token) {
      localStorage.setItem("authToken", query.auth_token);
    }
    if (!!query.user) {
      const userObject = JSON.parse(query.user);
      console.log(["user data is here", userObject]);
      window.setTimeout(() => { 
        UserActions.setUser(userObject)
      }, 300);
    }

    this.hideQuery();
  }

  hideQuery(props) {
    if (!props) props = this.props;

    /** @type {string} */
    const query = props.location.search;
    const regexs = {
      userRegex: /(\?user=|&user=)[^&]+/gi,
      authRegex: /(\?auth_token=|&auth_token=)[^&]+/gi
    };
    let nextQuery = query;

    for (const key in regexs) {
      if (regexs[key]) {
        nextQuery = nextQuery.replace(regexs[key], "");
      }
    }

    // replace URL
    if (nextQuery !== query) {
      const url = props.location.pathname + nextQuery;
      props.history.replace(url);
    }

  }

  handleSelect(eventKey) { if (!!eventKey) this.setState(eventKey, () => { window.scrollTo(0, 0); }); }

  changeUILang() {
    TranslationActions.setLocale(this.state.locale === "en" ? "zh-HK" : "en");
  }

  render() {
    // const query = queryString.parse(this.props.location.search),
          // shouldNotRoute = !!query.user || !!query.auth_token;
    // console.log([this.props, this.state]);
    return (
      <div style={{paddingTop: "50px"}}>
        <NavBar />
        <Route exact path="/" component={() => <Redirect to="/jobs/stable" />} />
        <Route path="/about" component={() => <Redirect to="/home" />} />
        <Route path="/jobs/:jobType" component={Browse} />
        <Route path="/home" component={Home} />
      </div>
    );
  }
}

export default withRouter(App);

// class App extends Reflux.Component {
//   constructor() {
//     super();
//     // if (!localStorage.getItem("uiLang")) localStorage.setItem("uiLang", "en");
//     // this.http = new Http();
//     // this.vars = new Variable();
//     // this.translation = new Translation();
//     this.state = {};
//     this.stores = [JobStore, TranslationStore]
//   }

//   goToPage(val, jobsTabViewType) {
//     const obj = {};
//     obj.currentTab = val;
//     if (jobsTabViewType) obj.jobsTabViewType = jobsTabViewType;
//     this.setState(obj, () => { window.scrollTo(0, 0); });
//   }
//   /** @param {'quick'|'stable'|'internship'|'project'} str */
//   changeJobsViewType(str) {
//     if (str === this.state.jobsTabViewType) return;
//     this.http.log({name: "ChangeViewType", action: "Click", page: "Browse", component: "JobsSearchBar", target: str});
//     this.setState(s => { s.jobsTabViewType = str; return s; }, () => { window.scrollTo(0, 0); });
//   }

//   changeUILang() {
//     const locale = this.translation.getLocale() === "en" ? "zh-HK" : "en";
//     this.translation.setLocale(locale);
//     const tStrings = this.translation.getTStrings(locale);
//     this.setState(s => {
//       s.locale = locale;
//       s.tStrings = tStrings;
//       return s;
//     }, () => {
//       this.http.log({
//         name: "change translation",
//         action: this.state.locale,
//         component: "navbar"
//       });
//     });
//   }

//   isHome(locationState) {
//     return locationState.from.pathName === "/";
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <Router>
//         <div>
//           <Navbar
//             fluid inverse collapseOnSelect fixedTop
//             onSelect={(eventKey) => this.handleSelect(eventKey)}
//           >
//             <Navbar.Header>
//               <Navbar.Brand>
//                 <a onClick={() => { this.handleSelect({currentTab: 1}); }}>
//                   <img src="./resources/logo-landscape.png" alt="HJobs" />
//                 </a>
//               </Navbar.Brand>
//               <Navbar.Toggle />
//               <div
//                 id="uiLang"
//                 style={{float: "right", disply: "inline-block", padding: "15px", color: "#888"}}
//                 onClick={() => { this.changeUILang(); }}
//               >
//                 <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
//               </div>
//             </Navbar.Header>

//             <Navbar.Collapse>
//               <Nav pullRight>
//                 <NavItem
//                   active={this.state.currentTab === 1}
//                   eventKey={{currentTab: 1}}
//                   href="#">
//                   {this.state.tStrings.navbar.about}
//                 </NavItem>
//                 <NavItem
//                   active={this.state.currentTab === 2}
//                   eventKey={{currentTab: 2, jobsTabViewType: "stable"}}
//                   href="#">
//                   {this.state.tStrings.navbar.viewJobs}
//                 </NavItem>
//                 <NavItem
//                   active={false}
//                   onClick={() => window.open("http://admin.hjobs.hk")}>
//                   {this.state.tStrings.navbar.postJobs}
//                 </NavItem>
//               </Nav>
//               <Navbar.Text
//                 pullRight
//                 onClick={() => { this.changeUILang(); }}
//               >
//                 <span style={{cursor: "pointer"}}>{this.state.locale === "en" ? "䌓" : "en"}</span>
//               </Navbar.Text>
//               <Navbar.Text
//                 pullRight
//                 // onClick={() => { this.changeUILang(); }}
//               >
//                 <a href="http://dev.hjobs.hk:9080/auth/google">Login</a>
//               </Navbar.Text>
//             </Navbar.Collapse>
//           </Navbar>
//         {/*this.props.children*/}
//         {
//           /**
//            <Route path="/home" component={
//              <Home t={this.state.tStrings} />
//            } />
//            <Route path="/jobs/:job_type" component={
//              <Browse
//                viewType={this.state.jobsTabViewType}
//                changeViewType={(str) => { this.changeJobsViewType(str); }}
//                t={this.state.tStrings}
//              />
//            } />
//            */
//         }
//           <Route path="/" component={Test} />
//         </div>
//       </Router>
//     );
//   }
//   // render() {
//   //   console.log(["this.props at app component = ", this.props]);
//   //   return (
//   //     <Router >
//   //       <div className="App">
//   //         <div className="App-header">
//   //           <img src={logo} className="App-logo" alt="logo" />
//   //           <h2>Welcome to React</h2>
//   //         </div>
//   //         <Link to="/about">Yo</Link>
//   //         <p className="App-intro">
//   //           {this.props.children}
//   //         </p>
//   //         <Route exact path="/about" component={About} />
//   //       </div>
//   //     </Router>
//   //   );
//   // }
// }

// export default App;
