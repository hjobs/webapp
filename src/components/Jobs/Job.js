import React from 'react';
import TimeAgo from 'react-timeago';
import { Button, Row, Col } from 'react-bootstrap';

import Variable from '../../var';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  render() {
    const job = this.props.job;
    const org = job.orgs[0];
    const imgSrc = !!job.photo ? job.photo : org.logo;
    const colorClass = this.vars.getColorClass(job);
    const DateTag = (props) => (
      <div className="flex-row flex-vhCenter date-tag" key={'datetag-' + JSON.stringify(props.date)}>
        <div>{this.vars.getMonth(props.date.getMonth())}{' '}{this.vars.pad2(props.date.getDate())}</div>
      </div>
    );

    return (
      <div className="job-container flex-row">
        <div
          className="job-thumbnail"
          style={{backgroundImage: "url('" + imgSrc + "')"}} />
        <div className="detail-container">
          <div className="flex-row flex-hStart flex-vCenter">
            {job.job_type === 'quick' ? <div className={'traffic ' + colorClass} /> : null}
            <div className="job-title"><span className="link" onClick={() => { this.props.applyJob(); }}>
              {job.title}
            </span></div>
          </div>
          {job.periods && job.periods.length > 0 ?
            <div className="flex-row flex-hStart flex-vCenter">
              {job.periods.map(period => <DateTag date={new Date(period.start_time)} />)}
            </div> : null
          }
          <p>
            <span><i className="fa fa-usd" aria-hidden="true"></i> {this.vars.getSalaryDescription(job)}</span><br />
            {job.locations && job.locations.length > 0 ?
              <span>
                <i className="fa fa-map-marker" aria-hidden="true"></i> {job.locations[0].address}<br />
              </span>
              : null
            }
            <i className="fa fa-building" aria-hidden="true"></i>{org.name}
          </p>
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
  job: React.PropTypes.any.isRequired,
  applyJob: React.PropTypes.func.isRequired
};

export default Job;
