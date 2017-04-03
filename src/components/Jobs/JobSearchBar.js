import React from 'react';
import 'whatwg-fetch';
// import { Row, Col } from 'react-bootstrap';

import Variable from '../../services/var';

class JobSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  render() {
    const jobTypeClass = "job-type flex-col flex-vhCenter ";
    return (
      <div className="full-width job-search-bar flex-row flex-vhCenter">
        <div className="job-type-container flex-row flex-hCenter">
          {/* <div className="title flex-col flex-vhCenter">Filter: </div> */}
          {
            this.vars.jobTypes.map(item => (
              <div
                className={this.props.viewType === item.value ? jobTypeClass + "active" : jobTypeClass}
                key={'job-search-job-type' + item.value}
                onClick={() => { if (!this.props.loading) this.props.changeViewType(item.value); }}
              >
                {this.props.t.jobTypes[item.value]}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

JobSearchBar.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  changeViewType: React.PropTypes.func.isRequired,
  viewType: React.PropTypes.string.isRequired,
  t: React.PropTypes.any.isRequired
};

export default JobSearchBar;
