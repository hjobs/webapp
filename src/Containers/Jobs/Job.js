import React from 'react';
// import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';

import TrafficLight from '../../Components/Traffic/TrafficLight';
import { Tags, Location, Salary } from '../../Components/Job/JobComponents';
import './styles/job.css';

// import TranslationStore from '../../stores/translationStore';

import Http from '../../services/http';
// import Variable from '../../services/var';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.store = TranslationStore;
  }

  openModal() {
    Http.log({
      name: "ViewJob",
      action: "Click",
      component: "Job",
      job_id: +this.props.job.id
    })
    const hasQuery = !!this.props.location.search,
          url = (
            this.props.location.pathname +
            (
              hasQuery ? 
                this.props.location.search + "&job=" + this.props.job.id :
                "?job=" + this.props.job.id
            )
          );
    this.props.history.push(url);
  }

  render() {
    const job = this.props.job;
    if (!job) return null;
    const org = job.orgs[0];

    return (
      <div className="job-container flex-row" onClick={() => this.openModal()}>
        {/* Image */}
        <div
          className="job-thumbnail"
          style={{backgroundImage: "url('" + encodeURIComponent(job.photo) + "')"}} />
        <div className="detail-container">
          {/* Traffic Light */}
          <div className="flex-row flex-hStart flex-vCenter">
            <div className="job-title full-width">
              <TrafficLight show={job.job_type === 'quick'} job={job} />
              <span className="link">{job.title}</span>
            </div>
          </div>
          {/* Tags */}
          <Tags job={job} />
          <div className="icon-text">
            {/* Salary */}
            <Salary job={job} />
            <br />
            {/* Location */}
            <Location job={job} />
            {/* Org Name */}
            <i className="fa fa-building" aria-hidden="true"></i>{" "}
            {org.name}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Job);
