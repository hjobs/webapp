import React from 'react';
import 'whatwg-fetch';
// import { Row, Col } from 'react-bootstrap';

import Jobs from './Jobs';
import ApplyModal from './ApplyModal';
import Search from '../Search/Search';

import Variable from '../../services/var';
import Http from '../../services/http';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      jobs: null,
      viewType: props.viewType
    };
    this.variable = new Variable();
    this.http = new Http();
  }

  componentWillMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props);
    // console.log(prevProps);
    if (this.state.viewType !== nextProps.viewType && this.props.viewType !== nextProps.viewType) {
      this.setState(s => {
        s.viewType = nextProps.viewType;
        return s;
      }, () => { this.refresh(); });
    }
  }

  openModal(job) { this.setState(s => { s.modalShown = true; s.applyModalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalShown = false; return s; }); }
  /** @param {'quick'|'stable'|'internship'|'project'} str */
  changeViewType(str) { this.setState(s => { s.viewType = str; return s; }, () => { this.refresh(); }); }

  refresh() {
    const urlSuffix = 'jobs/job_type/' + this.state.viewType;
    
    this.http.request(urlSuffix).then(res => {
      if (!res.ok) console.log(['res is not ok, logging res inside Jobs.js refresh() fetch()', res]);
      return res.json();
    }).then(d => {
      console.log(["going to log jobs data from server: d", d]);
      if (d && !d.error) {
        this.setState({jobs: d}, () => {
          console.log(["going to log this.statee", this.state]);
        });
      }
    }, err => { console.log(err); });
  }

  render() {
    // const backgroundColor = {backgroundColor: "#FFFFFF"};

    return this.props.viewType ? (
      <div className="container-fluid jobs">
        <Search
          viewType={this.state.viewType}
          changeViewType={(str) => { this.changeViewType(str); }}
        />
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
    ) : null;
  }
}

Browse.propTypes = {
  viewType: React.PropTypes.string.isRequired
};

export default Browse;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
