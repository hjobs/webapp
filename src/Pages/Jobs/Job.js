import React from 'react';
import Reflux from 'reflux';
// import TimeAgo from 'react-timeago';
// import { Button, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import TrafficLight from '../Traffic/TrafficLight';

import Http from '../../services/http';
import Variable from '../../services/var';

class JobWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    //       string={Variable.getMonth(date.getMonth()) + " " + Variable.pad2(date.getDate())}
    //     />
    //   );
    // });

    return (
      <div className="job-container flex-row" onClick={() => this.openModal()}>
        <div
          className="job-thumbnail"
          style={{backgroundImage: "url('" + imgSrc + "')"}} />
        <div className="detail-container">
          <div className="flex-row flex-hStart flex-vCenter">
            <div className="job-title full-width">
              <TrafficLight show={job.job_type === 'quick'} job={job} />
              <span className="link">{job.title}</span>
            </div>
          </div>
          {!!tags && tags.length > 0 ?
            <div className="flex-row flex-hStart flex-vCenter">
              {tags}
            </div> : <div className="full-width" style={{height: '5px'}} />
          }
          <p>
            <span><i className="fa fa-usd" aria-hidden="true"></i> {Variable.getSalaryDescription(job)}</span><br />
            {job.locations && job.locations.length > 0 ?
              <span>
                <i className="fa fa-map-marker" aria-hidden="true"></i> {job.locations.map(l => l.address).join(", ")}<br />
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

// Job.propTypes = {
//   job: React.PropTypes.any.isRequired
// };
const Job = withRouter(JobWithoutRouter)

export default Job;
