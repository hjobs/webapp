import React from 'react';
// import TimeAgo from 'react-timeago';
// import { Button, Row, Col } from 'react-bootstrap';

import TrafficLight from '../Traffic/TrafficLight';

import Variable from '../../services/var';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  render() {
    const job = this.props.job;
    const org = job.orgs[0];
    const imgSrc = !!job.photo ? job.photo : org.logo;
    const Tag = (props) => (
      <div className={"flex-row flex-vhCenter tag"}>
        <div className={props.type}>{props.string}</div>
      </div>
    );
    const tags = [];
    if (job.event) {
      tags.push(
        <Tag
          string={job.event}
          type="event"
          key={job.id + "-event-" + job.event}
        />
      );
    }
    if (job.langs && job.langs.length > 0) {
      job.langs.forEach(lang => {
        const strArr = lang.name.split("");
        strArr[0] = strArr[0].toUpperCase();
        let str = strArr.join("");
        tags.push(
          <Tag
            string={str}
            type="lang"
            key={job.id + "-langs-" + lang.name}
          />
        );
      });
    }
    if (!!job.date_tags && job.date_tags.length > 0) {
      job.date_tags.forEach(dateTagStr => {
        tags.push(
          <Tag
            key={job.id + "-datetag-" + dateTagStr}
            string={dateTagStr}
            type="date"
          />
        );
      });
    }
    // const sortedPeriods = job.periods.sort((a, b) => new Date(a.date) - new Date(b.date));
    // const afterTodayPeriods = [];
    // const condensedPeriods = [];
    // sortedPeriods.forEach(p => {
    //   const today = new Date();
    //   const periodDate = new Date(p.date);
    //   today.setHours(0, 0, 0, 0);
    //   periodDate.setHours(0, 0, 0, 0);
    //   if (today < periodDate) afterTodayPeriods.push(p);
    // });
    // periods.forEach(period => {
    //   const date = new Date(period.start_time || period.date);
    //   tags.push(
    //     <Tag
    //       key={job.id + '-datetag_' + (date.valueOf())}
    //       type="period"
    //       string={this.vars.getMonth(date.getMonth()) + " " + this.vars.pad2(date.getDate())}
    //     />
    //   );
    // });

    return (
      <div className="job-container flex-row">
        <div
          className="job-thumbnail"
          style={{backgroundImage: "url('" + imgSrc + "')"}} />
        <div className="detail-container">
          <div className="flex-row flex-hStart flex-vCenter">
            <div className="job-title full-width">
              <TrafficLight show={job.job_type === 'quick'} job={job} />
              <span className="link" onClick={() => { this.props.applyJob(); }}>{job.title}</span>
            </div>
          </div>
          {job.periods && job.periods.length > 0 ?
            <div className="flex-row flex-hStart flex-vCenter">
              {tags}
            </div> : <div className="full-width" style={{height: '5px'}} />
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
  }
}

Job.propTypes = {
  job: React.PropTypes.any.isRequired,
  applyJob: React.PropTypes.func.isRequired
};

export default Job;
