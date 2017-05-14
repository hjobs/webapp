import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';

import TrafficLight from '../../Components/Traffic/TrafficLight';

import TranslationStore from '../../stores/translationStore';

import Http from '../../services/http';
import Variable from '../../services/var';

class JobWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = TranslationStore;
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
    const job = this.props.job,
          t = this.state.tStrings;
    if (!job) return null;
    const org = job.orgs[0];
    const imgSrc = !!job.photo ? job.photo : (!org ? "" : org.logo);
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
        tags.push(
          <Tag
            string={t.misc.languages[lang.code]}
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

    return (
      <div className="job-container flex-row" onClick={() => this.openModal()}>
        {/* Image */}
        <div
          className="job-thumbnail"
          style={{backgroundImage: "url('" + imgSrc + "')"}} />
        <div className="detail-container">
          {/* Traffic Light */}
          <div className="flex-row flex-hStart flex-vCenter">
            <div className="job-title full-width">
              <TrafficLight show={job.job_type === 'quick'} job={job} />
              <span className="link">{job.title}</span>
            </div>
          </div>
          {/* Tags */}
          {
            !!tags && tags.length > 0 ?
              <div className="flex-row flex-hStart flex-vCenter">
                {tags}
              </div> :
              <div className="full-width" style={{height: '5px'}} />
          }
          <p>
            {/* Salary */}
            <span>
              <i className="fa fa-usd" aria-hidden="true"></i>{" "}
              {Variable.getSalaryDescription(job)}
              {
                !job.has_bonus ? "" :
                <span style={{
                  borderBottom: "1px dotted #101010",
                  marginLeft: "1em"
                }}>
                  {t.job.salaryMore}
                </span>
              }
            </span>
            <br />
            {/* Location */}
            {!!job.locations && job.locations.length > 0 ?
              <span>
                <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                {job.locations.map(l => l.address).join(", ")}<br />
              </span>
              : null
            }
            {/* Org Name */}
            <i className="fa fa-building" aria-hidden="true"></i>{" "}
            {org.name}
          </p>
        </div>
      </div>
    );
  }
}

const Job = withRouter(JobWithoutRouter)

export default Job;
