import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
let Loading = require('react-loading');
const queryString = require('query-string');

import Job from './Job';
import ErrorDiv from '../../Components/Utilities/ErrorDiv';

import JobStore, { JobActions } from '../../stores/jobStore';
import AdStore from '../../stores/adStore';

const NoListing = () => (
  <div className="flex-row flex-vhCenter" style={{minHeight: "200px", padding: "20px"}}>
    No listing. Try other categories!
  </div>
);

class JobsWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.stores = [JobStore, AdStore];
  }

  componentDidMount() {
    const jobType = this.props.match.params.jobType
    const page = queryString.parse(this.props.location.search).page || 1;
    this.loadJobsIfNeeded(jobType, page);
  }

  componentWillReceiveProps(nextProps) {
    // this.checkForServerCall(nextProps);
    // console.log(["logging this.props, nextprops : ", this.props, nextProps]);
    const urlChanged = (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.location.search !== nextProps.location.search
    );
    if (urlChanged) {
      window.scrollTo(0, 0);
      const page = +queryString.parse(nextProps.location.search).page || 1;
      this.loadJobsIfNeeded(nextProps.match.params.jobType, +page);
    }
  }

  loadJobsIfNeeded(jobType, page) {
    if (this.loadJobsIsNeeded(jobType, +page)) {
      JobActions.loadJobs(jobType, +page);
    }
  }

  loadJobsIsNeeded(jobType, page) {
    const jobs = this.state.jobs[jobType];
    return (
      jobs.loading !== true && (
        jobs.data === null ||
        !jobs.totalPages === null ||
        jobs.loadedPages.indexOf(+page) === -1
      )
    );
  }

  /** @return {array} */
  sliceJobs(jobs, page) {
    if (!jobs || !page) return;
    const itemsPerPage = this.state.jobs.itemsPerPage;
    return jobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }

  getView() {
    // return null;
    const { match, location } = this.props;
    const jobType = match.params.jobType;
    const page = queryString.parse(location.search).page || 1;
    if (!jobType || !page) return null;
    else {
      const jobs = this.state.jobs[jobType];
      if (jobs.loading) return (
        <div className="flex-row flex-vhCenter" style={{minHeight: "200px", padding: "20px"}}>
          <Loading type="bubbles" color="black" />
        </div>
      );
      else if (!!jobs.error) return <ErrorDiv />;
      else if (jobs.loadedPages === null) {
        return null;
      } else {
        if (!jobs.data || jobs.data.length === 0) return <NoListing />;
        const jobsInView = jobs.data[page - 1];
        return this.renderRows(jobsInView);
      }
    }
  }

  renderRows(jobs) {
    if (!jobs || jobs.length < 1) return null;
    const arr = [];
    const ad = this.state.ad.current;
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
          <Job job={jobs[i]} />
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
    const view = this.getView();

    return (
      <div className="flex-col flex-vhCenter full-width" id="job-outer-outer-div">
        <div className="outter-div">
          {view}
        </div>
      </div>
    );
  }
}

// JobsWithoutRouter.propTypes = {
//   openModal: React.PropTypes.func.isRequired,
//   jobs: React.PropTypes.any.isRequired,
//   ad: React.PropTypes.any
// };

const Jobs = withRouter(JobsWithoutRouter);

export default Jobs;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
