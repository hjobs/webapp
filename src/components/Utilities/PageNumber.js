import React from 'react';
import Reflux from 'reflux';
import { withRouter, NavLink, RouteProps } from 'react-router-dom';
const queryString = require('query-string');
import clone from 'clone';
import { queryStringOption } from '../../services/var';
// import Http from '../../services/http';

import JobStore from '../../stores/jobStore';

class PageNumberWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = JobStore;
  }

  render() {
    const { match, location } = this.props,
          jobType = match.params.jobType,

          queryObj = queryString.parse(location.search, queryStringOption),
          page = +queryObj.page || 1,
          totalPage = this.state.jobs[jobType].totalPages || 0;
          
          // navLinkPrefix = "/jobs/" + match.params.jobType;


    if (!page || !jobType || !totalPage) return null;
    
    const pageArr = [];
    for (let i = 1; i <= totalPage; i++) {
      const nextLocation = clone(location),
            nextQuery = clone(queryObj);
      nextQuery.page = i;
      nextLocation.search = queryString.stringify(nextQuery, queryStringOption)
      pageArr.push(
        <NavLink
          key={"page-number" + i}
          className="page-number link"
          isActive={() => i === page}
          activeClassName="active"
          to={nextLocation}
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