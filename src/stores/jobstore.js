import React from 'react';
import Reflux from 'reflux';

import Variable from '../services/var';
import Http from '../services/http';

export const JobActions = Reflux.createActions([
  "loadJobs"
]);

const itemsPerPage = 15;

class JobStore extends Reflux.Store {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.listenables = JobActions;
  }

  getInitialState() {
    return {
      jobs: {
        quick: {
          data: null,
          loadedPages: null,
          totalPages: null,
          loading: false,
          error: null
        },
        stable: {
          data: null,
          loadedPages: null,
          totalPages: null,
          loading: false,
          error: null
        },
        intern: {
          data: null,
          loadedPages: null,
          totalPages: null,
          loading: false,
          error: null
        },
        project: {
          data: null,
          loadedPages: null,
          totalPages: null,
          loading: false,
          error: null
        },
        loading: false,
        filters: [],
        itemsPerPage
      }
    };
  }

  /** @param {JobType} jobType **/
  clearJobs(jobType) {
    this.setState(s => {
      if (!!jobType) {
        s.jobs[jobType].data = null;
        s.jobs[jobType].totalPages = null;
        s.jobs[jobType].loadedPages = null;
        s.jobs[jobType].loading = false;
        s.jobs[jobType].error = null;
      }
    })
  }

  /** @param {JobType} jobType @param {number} page */
  loadJobs(jobType, page, filter, clearData) {
    // console.log("page = " + page);
    page = !page ? 1 : +page;
    const pageIsEven = page % 2 === 0,
          pageMin = pageIsEven ? page - 1 : page,
          pageMax = pageIsEven ? page : page + 1,
          urlSuffixArray = [
            "by_job_type=" + jobType,
            "offset_by=" + ((pageMin - 1) * itemsPerPage),
          ];
          if (!!filter && filter.length > 0) {
            urlSuffixArray.push(filter.map((value) => ("filters[]=" + value)).join("&"));
          }
    console.log(["jobStore.js, loadJobs, urlSufixArray = ", urlSuffixArray])
    const getJobs = () => {
      const urlSuffix = 'jobs?' + urlSuffixArray.join("&");
      console.log("jobStore.js, loadJob, urlSuffix = " + urlSuffix);
      Http.request(urlSuffix).then(res => {
        if (!res.ok) console.log(['res is not ok, logging res inside Jobs.js refresh() fetch()', res]);
        return res.json();
      }).then(d => {
        console.log(d);
        if (!!d && !d.error) {
          this.setState(s => {
            const jobs = this.processJobsDataFromHttp(d.jobs),
                  totalPages = Math.ceil(d.total_count / itemsPerPage);
            s.jobs[jobType].error = null;
            s.jobs[jobType].totalPages = totalPages;
            s.filters = filter;
            if (!s.jobs[jobType].loadedPages) s.jobs[jobType].loadedPages = [];
            if (!s.jobs[jobType].data || clearData === true) s.jobs[jobType].data = new Array(s.jobs[jobType].totalPages);
            if (pageMin <= s.jobs[jobType].totalPages) {
              s.jobs[jobType].data[pageMin - 1] = jobs.slice(0, itemsPerPage);
              s.jobs[jobType].loadedPages.push(pageMin)
            }
            if (pageMax <= s.jobs[jobType].totalPages) {
              s.jobs[jobType].data[pageMax - 1] = jobs.slice(itemsPerPage, itemsPerPage * 2);
              s.jobs[jobType].loadedPages.push(pageMax);
            }
            s.jobs[jobType].loading = false;
            console.log(["inside loadJobs, logging d and s in setState", d, s]);
            return s;
          });
        } else throw Error("Server error.")
      }).catch(err => { this.setState(s => {
        console.log(err);
        s.jobs[jobType].error = JSON.stringify(err);
        s.jobs[jobType].loading = false;
        return s;
      }) });
    };
    this.setState(s => { s.jobs.loading = true; return s; }, getJobs());
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

  sliceJobs(jobs, page = 1) {
    const sliceStart = itemsPerPage * (page - 1);
    const sliceEnd = itemsPerPage * page;
    return jobs.slice(sliceStart, sliceEnd);
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
        str = Variable.getMonth(d.getMonth()) + " " + Variable.pad2(d.getDate());
      } else if (arr.length > 1) {
        const d1 = arr[0].date;
        const d2 = arr[arr.length - 1].date;
        str = Variable.getMonth(d1.getMonth()) + " " + Variable.pad2(d1.getDate()) + " - " + Variable.pad2(d2.getDate());
      } else {
        return "...";
      }
      return str;
    });
    // const dateTags = afterTodayPeriods.map(p => p.date.getDate() + " " + Variable.getMonth(p.date.getMonth())); // for ungrouped dates
    return {periods: afterTodayPeriods, dateTags};
  }
}

export default JobStore;
