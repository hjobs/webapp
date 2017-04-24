import React from 'react';
import Reflux from 'reflux';
import { withRouter, NavLink, RouteProps } from 'react-router-dom';
const queryString = require('query-string');
// import Variable from '../../services/var';
// import Http from '../../services/http';

import JobStore from '../../stores/jobStore';

class PageNumberWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = JobStore;
  }

  render() {
    const { match, location } = this.props;
    // if (this.state.jobs[match])
    // if (page.total === 1) return null;
    const jobType = match.params.jobType;
    const parsed = queryString.parse(location.search);
    const page = +parsed.page || 1;
    const totalPage = this.state.jobs[jobType].totalPages || 0;
    if (!page || !jobType || !totalPage) return null;
    
    const pageArr = [];
    for (let i = 1; i <= totalPage; i++) {
      pageArr.push(
        <NavLink
          key={"page-number" + i}
          className="page-number link"
          isActive={() => i === page}
          activeClassName="active"
          to={"/jobs/" + match.params.jobType + "?page=" + i}
        >{i}</NavLink>
      );
    }

    return (
      <div className="text-center page-number-container">
        {pageArr}
      </div>
    );
  }
}

const PageNumber = withRouter(PageNumberWithoutRouter);

export default PageNumber;