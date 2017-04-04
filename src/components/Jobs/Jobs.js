import React from 'react';
import 'whatwg-fetch';
import { Image } from 'react-bootstrap';

import Job from './Job';

import Http from '../../services/http';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.http = new Http();
  }

  openModal(job) {
    this.http.log({name: "ViewJob", action: "Click", job_id: job.id});
    this.props.openModal(job);
  }

  renderRows() {
    if (!this.props.jobs || this.props.jobs.length <= 0) return null;

    const arr = [];
    const jobs = this.props.jobs;
    const ad = this.props.ad;
    const adIndex = jobs.length > 2 ? 2 : (jobs.length - 1);
    let separatorCount = 0;
    // const colStyle = {paddingLeft: '5px', paddingRight: '5px'};
    /** @param {boolean} fullWidth */
    const getDivider = (fullWidth = false) => {
      separatorCount++;
      return (
        <div className="flex-row flex-hEnd separator-container" key={'separator-' + separatorCount}><div className="separator" style={fullWidth ? {width: "100%"} : null} /></div>
      );
    };

    for (let i = 0; i < jobs.length; i++) {
      arr.push(
        <div className="job-cell full-width" key={'renderjobs-div-' + jobs[i].id}>
          <Job
            job={jobs[i]}
            applyJob={ () => { this.openModal(jobs[i]); }} />
        </div>
      );
      arr.push(getDivider());
      if (i === adIndex && !!ad) {
        arr.push(
          <div className="job-cell full-width" key={"ad-" + ad.id}>
            <a href={!!ad.link ? ad.link : null}>
              <Image src={ad.image} className="full-width" responsive />
            </a>
          </div>
        );
        arr.push(getDivider());
      }
    }
    arr.pop();
    return arr;
  }

  render() {
    return (
      <div className="flex-col flex-vhCenter full-width" id="job-outer-outer-div">
        <div className="outter-div">
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  openModal: React.PropTypes.func.isRequired,
  jobs: React.PropTypes.any.isRequired,
  ad: React.PropTypes.any
};

export default Jobs;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
