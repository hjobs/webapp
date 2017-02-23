import React from 'react';
// import TimeAgo from 'react-timeago';
import { Button } from 'react-bootstrap';

class Job extends React.Component {
  render() {
    return (
      <div className="job-container flex-row">
        <div className="thumbnail-container flex-col flex-vCenter">
          <img src={this.props.data.org.logo} className="thumbnail" alt={this.props.data.org.name} />
        </div>
        <div className="detail-container">
          <h4>{this.props.data.title}</h4>
          <p>
            {this.props.data.org.name} <br />
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
  }
}

Job.propTypes = {
  data: React.PropTypes.any.isRequired,
  applyJob: React.PropTypes.func.isRequired
};

export default Job;
