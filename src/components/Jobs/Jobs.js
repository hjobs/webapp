import React from 'react';
import 'whatwg-fetch';
// import { Grid, Row, Col } from 'react-bootstrap';

import Job from './Job';

// import Variable from '../../var';

class Jobs extends React.Component {
  // constructor(props) {
    // super(props);
    // this.variable = new Variable();
  // }

  openModal(job) { this.props.openModal(job); }

  renderJobs() {
    const arr = [];
    const jobs = this.props.jobs;
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
    }
    arr.pop();
    return arr;
  }

  render() {
    let dataArr = [];
    const jobs = this.props.jobs;
    if (jobs && jobs.length > 0) {
      dataArr = this.renderJobs();
    }

    return (
      <div className="flex-col flex-vhCenter" id="job-outer-outer-div">
        <div className="outter-div">
          {dataArr}
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  openModal: React.PropTypes.func.isRequired,
  viewType: React.PropTypes.string.isRequired,
  jobs: React.PropTypes.any.isRequired
};

export default Jobs;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
