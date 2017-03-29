import React from 'react';
import 'whatwg-fetch';
// import { Row, Col } from 'react-bootstrap';

import Jobs from './Jobs';
import JobSearchBar from './JobSearchBar';
import ApplyModal from './ApplyModal';
import Description from '../Traffic/Description';

import Variable from '../../services/var';
import Http from '../../services/http';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      jobs: null,
      viewType: props.viewType,
      loading: false
    };
    this.vars = new Variable();
    this.http = new Http();
  }

  componentWillMount() { this.refresh(); this.http.log({name: "Enter", page: "Browse", action: "Enter"}); }

  componentWillReceiveProps(nextProps) { if (this.props.viewType !== nextProps.viewType) this.refresh(); }

  openModal(job) { this.setState(s => { s.modalShown = true; s.applyModalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalShown = false; return s; }); }

  refresh() {
    this.setState(s => { s.loading = true; }, () => {
      const urlSuffix = 'jobs/job_type/' + this.props.viewType;

      this.http.request(urlSuffix).then(res => {
        if (!res.ok) console.log(['res is not ok, logging res inside Jobs.js refresh() fetch()', res]);
        return res.json();
      }).then(d => {
        console.log(["going to log jobs data from server: d", d]);
        if (!!d && !d.error) {
          this.setState(s => {
            s.jobs = this.processJobsDataFromHttp(d);
            s.loading = false;
            return s;
          }, () => console.log(["going to log this.statee", this.state]));
        }
      }, err => { console.log(err); });
    });
  }

  processJobsDataFromHttp(jobs) {
    return jobs.map(job => {
      const periodObj = this.modifyPeriodsFromHttpData(job.periods);
      job.periods = periodObj.periods;
      job.date_tags = periodObj.dateTags || null;
      return job;
    });
  }

  /** @return {{periods: [object], dateTags: [string]}} */
  modifyPeriodsFromHttpData(periods) {
    const sortedPeriods = periods.map(p => {
      if (p.date) {
        p.date = new Date(p.date);
        console.log(p.date);
        p.date.setHours(0, 0, 0, 0);
      }
      if (p.start_time) p.start_time = new Date(p.start_time);
      if (p.end_time) p.end_time = new Date(p.end_time);
      return p;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    const afterTodayPeriods = [];
    const condensedPeriods = [];
    sortedPeriods.forEach(p => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (today < p.date) afterTodayPeriods.push(p);
    });
    let condensedPeriodsIndex;
    afterTodayPeriods.forEach(period => {
      if (condensedPeriods.length === 0) {
        condensedPeriods.push([period]);
        condensedPeriodsIndex = 0;
      } else {
        const currentArr = condensedPeriods[condensedPeriodsIndex];
        const prevDate = currentArr[currentArr.length - 1].date;
        const isOneDayDifferent = (prevDate.getMonth() === period.date.getMonth()) && ((period.date.getDate() - prevDate.getDate()) === 1);
        if (isOneDayDifferent) currentArr.push(period);
        else {
          condensedPeriods.push([period]);
          condensedPeriodsIndex ++;
        }
      }
    });
    const dateTags = condensedPeriods.map(arr => {
      let str;
      if (arr.length === 1) {
        const d = arr[0].date;
        str = this.vars.getMonth(d.getMonth()) + " " + this.vars.pad2(d.getDate());
      } else if (arr.length > 1) {
        const d1 = arr[0].date;
        const d2 = arr[arr.length - 1].date;
        str = this.vars.getMonth(d1.getMonth()) + " " + this.vars.pad2(d1.getDate()) + " - " + this.vars.pad2(d2.getDate());
      } else {
        return "...";
      }
      return str;
    });
    return {periods: afterTodayPeriods, dateTags};
  }

  render() {
    // const backgroundColor = {backgroundColor: "#FFFFFF"};
    if (!this.props.viewType) return null;

    return (
      <div className="container-fluid jobs">
        <JobSearchBar
          loading={this.state.loading}
          viewType={this.props.viewType}
          changeViewType={(str) => { this.props.changeViewType(str); }}
        />
        <div style={this.props.viewType === "quick" ? {height: "50px"} : {height: "25px"}} />
        {this.props.viewType === 'quick' ? <Description /> : null}
        {
          !!this.state.jobs && this.state.jobs.length > 0 ?
            <Jobs
              jobs={this.state.jobs}
              openModal={(job) => { this.openModal(job); }}
            /> : null
        }
        <ApplyModal
          data={this.state.applyModalData}
          shown={this.state.modalShown}
          closeModal={ () => { this.closeModal(); }}
        />
      </div>
    );
  }
}

Browse.propTypes = {
  viewType: React.PropTypes.string.isRequired,
  changeViewType: React.PropTypes.func.isRequired
};

export default Browse;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
