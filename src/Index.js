import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, browserHistory } from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './components/App';

// import Home from './components/Home/Home';
// import Browse from './components/Jobs/Browse';

window.React = React;

// const routes = (
//   <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
//     <Route path="/" component={App}>
//       <Route path="jobs/:type" component={Browse} />
//       <Route path="*" component={Home} />
//     </Route>
//   </Router>
// );

render(
  <App />,
  document.getElementById('app')
);

// ORIGINAL
/* render(
  (<Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>), document.getElementById('app')
); */
