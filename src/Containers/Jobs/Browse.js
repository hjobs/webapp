/** @typedef {'quick'|'stable'|'internship'|'project'} JobType */

import React from 'react';
import Reflux from 'reflux';
// import { Redirect } from 'react-router-dom';
import 'whatwg-fetch';
// import { Row, Col } from 'react-bootstrap';
const queryString = require("query-string");

import Jobs from './Jobs';
import JobSearchBar from './JobSearchBar';
import ApplyModal from './ApplyModal';
import Description from '../../Components/Traffic/Description';
import PageNumber from '../../Components/Utilities/PageNumber';

import JobStore from '../../stores/jobStore';
import UserStore, { UserActions } from '../../stores/userStore';

import Variable from '../../services/var';
import Http from '../../services/http';

class Browse extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.getModalInitialState()
    };
    this.stores = [JobStore, UserStore];
  }

  getModalInitialState() {
    return {
      loading: false,
      data: null,
      error: null,
      show: false
    };
  }

  componentWillMount() {
    super.componentWillMount.call(this);
    this.logNavigation();
    this.checkRoute();
    this.prepareModalData()
  }

  componentWillReceiveProps(nextProps) {
    this.checkRoute(nextProps);
    if (nextProps.location.search !== this.props.location.search) {
      this.prepareModalData(nextProps);
    }
  }

  logNavigation(props) {
    if (!props) props = this.props;
    const query = queryString.parse(props.location.search),
          page = query.page || 1,
          logTarget = props.match.params.jobType + " page" + page;
    Http.log({
      name: "EnterPage",
      page: "Browse",
      action: "Enter",
      target: logTarget
    });
  }

  checkRoute(props) {
    if (!props) props = this.props;
    if (this.jobTypeUnacceptable(props.match.params.jobType)) {
      props.history.replace("/jobs/stable?page=1");
    } else {
      const query = queryString.parse(props.location.search);
      if (!props.location.search || !query.job) {
        this.setState(s => {
          s.modal = this.getModalInitialState();
          return s;
        });
      }
    }
  }

  jobTypeUnacceptable(jobType) {
    const index = Variable.jobTypes.reduce((prev, curr, i) => {
      if (jobType === curr.value) return i;
      return prev;
    }, -1);
    return index === -1;
  }

  prepareModalData(props) {
    if (!props) props = this.props;
    const { location } = props;
    const query = queryString.parse(location.search);
    if (!query || !query.job) return null;

    const modalData = this.returnModalData(props);
    if (!modalData) {
      if (!!this.state.modal.loading) return;
      this.setState(s => {
        s.modal.loading = true;
        s.modal.show = true;
        return s;
      }, () => {
        Http.request("jobs/" + query.job).then(res => res.json()).then(d => {
          const hasError = !d || !!d.error;
          this.setState(s => {
            s.modal.loading = false;
            s.modal.data = hasError ? null : d;
            s.modal.show = hasError ? false : true;
            s.modal.error = hasError;
            return s;
          });
        });
      })
    } else {
      this.setState(s => {
        s.modal.loading = false;
        s.modal.data = modalData;
        s.modal.error = null;
        s.modal.show = true;
        return s;
      });
    }
  }

  /** @return {null || jobObject} */
  returnModalData(props) {
    if (!props) props = this.props;
    const { location, match } = props;
    const jobType = match.params.jobType;
    console.log(["!location || !jobType || !this.state.jobs", !location, !jobType, !this.state.jobs]);
    if (!location || !jobType || !this.state.jobs) return null;

    const jobs = this.state.jobs[jobType];
    if (!jobs || !jobs.data) return null;

    const query = queryString.parse(location.search);
    if (!query.job) return null;

    const jobsInPage = jobs.data[!!query.page ? (query.page - 1) : 0];
    // console.log(["jobsInPage", jobsInPage])
    if (!jobsInPage) return null;

    const jobIndex = Variable.indexOfDataInArray({id: +query.job}, jobsInPage);
    // console.log(jobIndex);
    return jobsInPage[jobIndex] || null;
  }

  modalOnConfirmApply() {
    this.setState(s => {
      s.modal.loading = true;
      return s;
    }, () => {
      if (!this.state.modal.error) {
        const obj = { application: { job_id: this.state.modal.data.id } };
        Http.request("apply", "POST", obj)
          .then(res => {
            // console.log(["res = ", res]);
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then(d => {
            // console.log(["d = ", d]);
            if (!d) throw Error("Error in application. Check internet connection");
            let appliedJobsArray = this.state.appliedJobs || [];
            if (!appliedJobsArray) appliedJobsArray = [];
            appliedJobsArray.push(this.state.modal.data.id);
            // localStorage.setItem("appliedJobs", JSON.stringify(appliedJobsArray));

            this.setState(s => {
              s.modal.loading = false;
              s.modal.error = false;
              return s;
            }, () => {
              UserActions.setAppliedJobs(appliedJobsArray);
              this.props.history.push(
                this.props.location.pathname + 
                this.props.location.search.replace(
                  /(\?applying=|&applying=)[^&]+/,
                  ""
                )
              );
            });
          })
          .catch(err => {
            this.setState(s => {
              s.modal.show = false;
              s.modal.data = null;
              s.modal.loading = false;
              s.modal.error = err.toString();
            });
          });
      }
    });
  }
  modalOnClose() {
    this.props.history.push(
      this.props.location.pathname +
      this.props.location.search.replace(
        /\?job=\d*|&job=\d*/gi,
        ""
      )
    );
  }

  render() {
    const { match } = this.props;
    const jobType = match.params.jobType;
    if (!this.state.jobs) return null;
    const jobs = this.state.jobs[jobType];
    if (!jobs) return null;

    return (
      <div className="container-fluid jobs" style={{paddingTop: "35px"}}>
        <JobSearchBar
          loading={this.state.loading}
          viewType={this.props.viewType}
          changeViewType={(str) => { this.props.changeViewType(str); }}
          t={this.props.t}
        />
        {jobType === 'quick' ? <Description /> : <div style={{minHeight: "15px"}} />}
        <Jobs />
        {
          jobs.loading ? null :
            <div style={{padding: "15px 0px"}}>
              <PageNumber />
            </div>
        }
        <p className="text-center" style={{marginTop:"15px"}}>
          <a href="https://www.facebook.com/info.Hjobs.hk/" target="_blank" className="social-button"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
        </p>
        <ApplyModal
          modal={this.state.modal}
          onToggleApply={() => { this.modalOnToggleApply(); }}
          onConfirmApply={() => { this.modalOnConfirmApply(); }}
          closeModal={() => { this.modalOnClose(); }}
        />
      </div>
    );
  }
}

export default Browse;
