import React from 'react';
// import TimeAgo from 'react-timeago';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class Job extends React.Component {
  render() {
    const org = this.props.data.orgs[0];
    const imgSrc = !!this.props.data.photo ? this.props.data.photo : org.photo;
    return (
      <div className="job-container flex-row">
        <div className="thumbnail-container flex-col flex-vCenter">
          <img src={imgSrc} className="thumbnail" alt={this.props.data.title} />
        </div>
        <div className="detail-container">
          <h4>{this.props.data.title}</h4>
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
