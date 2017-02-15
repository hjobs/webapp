import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
// import { createHistory } from 'history';

import App from './components/App';
import Home from './components/Home/Home';
import Jobs from './components/Jobs/Jobs';

window.React = React;

// const history = useRouterHistory(createHistory)();

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="jobs/:type" component={Jobs} />
      <Route path="me" />
    </Route>
  </Router>
);

render(routes, document.getElementById('app'));

// ReactRouter.run(routes, (Handler) => {
//     ReactDOM.render(<Handler />, document.getElementById('todoapp'));
// });

/* render(
  (<Router history={hashHistory}>
    <Route path="/" component={App} />
  </Router>), document.getElementById('app')
); */
