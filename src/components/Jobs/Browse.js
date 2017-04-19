/** @typedef {'quick'|'stable'|'internship'|'project'} JobType */

import React from 'react';
import 'whatwg-fetch';
let Loading = require('react-loading');
// import Loading from 'react-loading';
// import { Row, Col } from 'react-bootstrap';

import Jobs from './Jobs';
import JobSearchBar from './JobSearchBar';
import ApplyModal from './ApplyModal';
import Description from '../Traffic/Description';
import PageNumber from '../Utilities/PageNumber';

import Variable from '../../services/var';
import Http from '../../services/http';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      jobs: {
        viewing: null,
        all: null
      },
      ad: {
        array: null,
        current: null,
        timer: null
      },
      page: {
        current: null,
        loaded: null,
        total: null
      },
      itemPerPage: 15,
      loading: false
    };
    this.vars = new Variable();
    this.http = new Http();
  }

  componentWillMount() { this.refresh(); this.http.log({name: "Enter", page: "Browse", action: "Enter"}); }
  componentWillReceiveProps(nextProps) { if (this.props.viewType !== nextProps.viewType) this.refresh(nextProps.viewType); }

  openModal(job) { this.setState(s => { s.modalShown = true; s.applyModalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalShown = false; return s; }); }

  /** @param {JobType} jobType @param {number} page */
  serverCall(jobType = this.props.viewType, page = 1) {
    console.log("page = " + page);
    page = page || 1;
    const pageIsEven = page % 2 === 0,
          pageMin = pageIsEven ? page - 1 : page,
          pageMax = pageIsEven ? page : page + 1;

    this.setState(s => { s.loading = true; s.jobs.viewing = null; return s; }, () => {
      const urlSuffix = 'jobs?by_job_type=' + jobType + "&offset_by=" + ((pageMin - 1) * this.state.itemPerPage);
      this.http.request(urlSuffix).then(res => {
        if (!res.ok) console.log(['res is not ok, logging res inside Jobs.js refresh() fetch()', res]);
        return res.json();
      }).then(d => {
        console.log(["going to log jobs data from server: d", d]);
        if (!!d && !d.error) {
          this.setState(s => {
            const jobs = this.processJobsDataFromHttp(d.jobs);
            s.page.total = Math.ceil(d.total_count / this.state.itemPerPage);
            s.page.current = page;
            if (!s.page.loaded) s.page.loaded = [];
            s.page.loaded.push(pageMin, pageMax);
            if (!s.jobs.all) s.jobs.all = new Array(s.page.total);
            s.jobs.all[pageMin - 1] = jobs.slice(0, this.state.itemPerPage);
            s.jobs.all[pageMax - 1] = jobs.slice(this.state.itemPerPage, this.state.itemPerPage * 2);
            s.jobs.viewing = s.jobs.all[page - 1];
            s.loading = false;
            return s;
          }, () => console.log(["going to log this.state", this.state]));
        }
      }, err => { console.log(err); });

      if (!this.state.ad.array || this.state.ad.array.length === 0) {
        this.http.request("ads").then(res => res.json()).then(d => {
          console.log(["got ads", d]);
          if (!!d && d.length > 0) {
            this.setState(s => {
              s.ad.array = d;
              s.ad.current = d[0];
              s.ad.timer = this.adTimer(d, d[0]);
              return s;
            });
          }
        });
      }
    });
  }

  refresh(jobType = this.props.viewType) {
    this.setState(s => {
      s.jobs.viewing = null;
      s.jobs.all = null;
      s.page = { current: null, loaded: null, total: null };
      this.serverCall(jobType);
    });
  }

  /** @param {number} num */
  goToPage(page) {
    if (!this.state.jobs.all || !this.state.jobs.all[page - 1]) {
      this.serverCall(this.props.viewType, page);
    } else {
      this.setState(s => {
        if (!!s.jobs.all && this.state.page.loaded.indexOf(page) !== -1) {
          s.jobs.viewing = s.jobs.all[page - 1];
          s.page.current = page;
        }
      });
    }
    window.scrollTo(0, 0);
  }

  sliceJobs(jobs = this.state.jobs.all, page = 1) {
    const sliceStart = this.state.itemPerPage * (page - 1);
    const sliceEnd = this.state.itemPerPage * page;
    return jobs.slice(sliceStart, sliceEnd);
  }

  adTimer(adArr, adCurr) {
    return window.setTimeout(() => {
      this.setState(s => {
        const currIndex = this.vars.indexOfDataInArray(adCurr, adArr);
        const nextIndex = currIndex < (adArr.length - 1) ? currIndex + 1 : 0;
        s.ad.current = adArr[nextIndex];
        s.ad.timer = this.adTimer(adArr, s.ad.current);
        return s;
      });
    }, 10000);
  }

  /** sort periods, discard unwanted periods, sort jobs according to periods or updated_at
   * @return {[object]}
   * @param {[object]} jobs
   * */
  processJobsDataFromHttp(jobs) {
    const hasPeriod = obj => !!obj.periods && obj.periods.length > 0;
    const getPeriodDate = obj => new Date(obj.periods[0].date);
    const getUpdatedDate = obj => new Date(obj.updated_at);
    return jobs.map(job => {
      const periodObj = this.modifyPeriodsFromHttpData(job.periods);
      job.periods = periodObj.periods;
      job.date_tags = periodObj.dateTags || null;
      return job;
    }).sort((a, b) => {
      const aHasPeriods = hasPeriod(a);
      const bHasPeriods = hasPeriod(b);
      if (aHasPeriods && bHasPeriods) return getPeriodDate(a) - getPeriodDate(b);
      else if (!aHasPeriods && bHasPeriods) return 1;
      else if (aHasPeriods && !bHasPeriods) return -1;
      return getUpdatedDate(b) - getUpdatedDate(a); // (!aHasPeriods && !bHasPeriods)
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
    // const dateTags = afterTodayPeriods.map(p => p.date.getDate() + " " + this.vars.getMonth(p.date.getMonth())); // for ungrouped dates
    return {periods: afterTodayPeriods, dateTags};
  }

  render() {
    // const backgroundColor = {backgroundColor: "#FFFFFF"};
    if (!this.props.viewType) return null;
    const pageArr = [];
    for (let i = 1; i <= this.state.page.total; i++) pageArr.push(i);

    return (
      <div className="container-fluid jobs">
        <JobSearchBar
          loading={this.state.loading}
          viewType={this.props.viewType}
          changeViewType={(str) => { this.props.changeViewType(str); }}
          t={this.props.t}
        />
        <div style={{height: "50px"}} />
        {this.props.viewType === 'quick' ? <Description t={this.props.t} /> : null}
        {
          this.state.loading ?
            <div className="flex-row flex-vhCenter" style={{minHeight: "200px"}}>
              <Loading type="bubbles" color="black" />
            </div> :
            (
              !!this.state.jobs.viewing && this.state.jobs.viewing.length > 0 ?
                <Jobs
                  jobs={this.state.jobs.viewing}
                  openModal={(job) => { this.openModal(job); }}
                  ad={this.state.ad.current}
                /> :
                null
            )
        }
        {
          !this.state.page || !this.state.page.current ? null :
            <div style={{padding: "15px 0px"}}>
              <PageNumber
                page={this.state.page}
                goToPage={(p) => { this.goToPage(p); }}
              />
            </div>
        }
        <p className="text-center" style={{marginTop: "15px"}}>
          <a href="https://www.facebook.com/info.Hjobs.hk/" className="social-button"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
        </p>
        <ApplyModal
          data={this.state.applyModalData}
          shown={this.state.modalShown}
          closeModal={ () => { this.closeModal(); }}
          t={this.props.t}
        />
      </div>
    );
  }
}

Browse.propTypes = {
  viewType: React.PropTypes.string.isRequired,
  changeViewType: React.PropTypes.func.isRequired,
  t: React.PropTypes.any.isRequired
};

export default Browse;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
