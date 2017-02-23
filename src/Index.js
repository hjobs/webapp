import React from 'react';
import { render } from 'react-dom';
// import { Router, Route, hashHistory } from 'react-router';
// import createBrowserHistory from 'history/lib/createBrowserHistory'

import App from './components/App';
// import Home from './components/Home/Home';
// import Jobs from './components/Jobs/Jobs';

window.React = React;

// const history = useRouterHistory(createHistory)();
// const history = createMemoryHistory({queryKey: false});
// const routes = (
//   <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
//     <Route path="/" component={App}>
//       <Route path="jobs/:type" component={Jobs} />
//       <Route path="me" />
//       <Route path="*" component={Home} />
//     </Route>
//   </Router>
// );

render(<App />, document.getElementById('app'));

// ORIGINAL
/* render(
  (<Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>), document.getElementById('app')
); */
