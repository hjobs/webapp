import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';

import '../../styles/main.css';

import Variable from '../../services/var';
import Http from '../../services/http';

import TranslationStore from '../../stores/translationStore';
import JobStore from '../../stores/jobStore';

class JobSearchBarWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [TranslationStore, JobStore];
  }

  render() {
    const t = this.state.tStrings;
    const { match, history } = this.props;
    const jobTypeClass = "job-type flex-col flex-vhCenter ";
    return (
      <div className="full-width job-search-bar flex-row flex-vhCenter">
        <div className="job-type-container flex-row flex-hCenter">
          {/* <div className="title flex-col flex-vhCenter">Filter: </div> */}
          {
            Variable.jobTypes.map(item => (
              <div
                className={match.params.jobType === item.value ? jobTypeClass + "active" : jobTypeClass}
                key={'job-search-job-type' + item.value}
                onClick={() => {
                  Http.log({
                    name: "ChangeViewType",
                    action: "Click",
                    component: "JobSearchBar",
                    target: "quick|stable|intern|project"
                  })
                  if (!this.state.jobs[match.params.jobType].loading) {
                    history.replace('/jobs/' + item.value);
                  }
                }}
              >
                {t.jobTypes[item.value]}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const JobSearchBar = withRouter(JobSearchBarWithoutRouter);

export default JobSearchBar;
