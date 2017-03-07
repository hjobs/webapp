import React from 'react';
import 'whatwg-fetch';
// import { Row, Col } from 'react-bootstrap';

import Jobs from './Jobs';
import ApplyModal from './ApplyModal';

import Variable from '../../var';

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      jobs: null,
      viewType: props.viewType
    };
    this.variable = new Variable();
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

  openModal(job) {
    this.setState(s => {
      s.modalShown = true;
      s.applyModalData = job;
      return s;
    });
  }

  closeModal() {
    this.setState(s => {
      s.modalShown = false;
      return s;
    });
  }

  refresh() {
    const url = this.variable.baseUrl + 'employee/jobs/job_type/' + this.props.viewType;
    console.log("Jobs.component did mount, url = " + url);
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (!res.ok) console.log(['res is not ok, logging res inside Jobs.js refresh() fetch()', res]);
      return res.json();
    }).then(d => {
      console.log(["going to log jobs data from server: d", d]);
      if (!d.error) {
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
        {
          !!this.state.jobs && this.state.jobs.length > 0 ?
            <Jobs
              viewType={this.props.viewType}
              jobs={this.state.jobs}
              openModal={(job) => { this.openModal(job); }}
              closeModal={() => { this.closeModal(); } } /> : null
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
