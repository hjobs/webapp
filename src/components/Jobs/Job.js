import React from 'react';
// import TimeAgo from 'react-timeago';
import { Button, Row, Col } from 'react-bootstrap';

import Variable from '../../var';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  render() {
    const job = this.props.data;
    const org = job.orgs[0];
    const imgSrc = !!job.photo ? job.photo : org.logo;
    const colorClass = this.vars.getColorClass(job);

    return (
      <div className="job-container flex-row">
        <div
          className="job-thumbnail"
          style={{backgroundImage: "url('" + imgSrc + "')"}} />
        <div className="detail-container">
          <div className="flex-row flex-hStart flex-vCenter">
            {job.job_type === 'quick' ? <div className={'traffic ' + colorClass} /> : null}
            <div className="job-title">{job.title}</div>
          </div>
          <p>
            {org.name} <br />
          </p>
          <Button
            bsSize="small"
            className="apply-button"
            onClick={() => { this.props.applyJob(); }}>
            show me more
          </Button>
        </div>
      </div>
    );
    // return (
    //   <Row md={24} lg={12}>
    //     <Col>
    //   </Col>
    // );
  }
}

Job.propTypes = {
  data: React.PropTypes.any.isRequired,
  applyJob: React.PropTypes.func.isRequired
};

export default Job;
