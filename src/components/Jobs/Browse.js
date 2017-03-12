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
      loading: true
    };
    this.variable = new Variable();
    this.http = new Http();
  }

  componentWillMount() { this.refresh(); }

  componentWillReceiveProps(nextProps) {
    if (this.props.viewType !== nextProps.viewType) this.refresh();
  }

  openModal(job) { this.setState(s => { s.modalShown = true; s.applyModalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalShown = false; return s; }); }
  /** @param {'quick'|'stable'|'internship'|'project'} str */
  changeViewType(str) { this.props.changeViewType(str); }

  refresh() {
    this.setState(s => { s.loading = true; }, () => {
      const urlSuffix = 'jobs/job_type/' + this.props.viewType;

      this.http.request(urlSuffix).then(res => {
        if (!res.ok) console.log(['res is not ok, logging res inside Jobs.js refresh() fetch()', res]);
        return res.json();
      }).then(d => {
        console.log(["going to log jobs data from server: d", d]);
        if (d && !d.error) {
          this.setState(s => { s.jobs = d; s.loading = false; return s; }, () => {
            console.log(["going to log this.statee", this.state]);
          });
        }
      }, err => { console.log(err); });
    });
  }

  render() {
    // const backgroundColor = {backgroundColor: "#FFFFFF"};
    if (!this.props.viewType) return null;

    return (
      <div className="container-fluid jobs">
        <JobSearchBar
          loading={this.state.loading}
          viewType={this.props.viewType}
          changeViewType={(str) => { this.changeViewType(str); }}
        />
        {this.props.viewType === "quick" ? <div style={{height: "25px"}} /> : null}
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
          closeModal={ () => { this.closeModal(); }} />
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
