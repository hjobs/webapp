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
        <div className="thumbnail-container flex-row flex-hCenter">
          <img src={imgSrc} className="thumbnail" alt={job.title} />
        </div>
        <div className="detail-container">
          <div className={'traffic ' + colorClass} style={{borderRadius: '50%', width: "10px", height: "10px"}} />
          <h4>{job.title}</h4>
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
