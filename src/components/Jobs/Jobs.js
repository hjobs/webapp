import React from 'react';
import 'whatwg-fetch';
import { Clearfix, Row, Col } from 'react-bootstrap';

import Job from './Job';
import ApplyModal from './ApplyModal';

import Variable from '../../var';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      data: null
    };
    this.variable = new Variable();
  }

  componentWillMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    // console.log(this.props);
    // console.log(prevProps);
    if (this.props.viewType !== prevProps.viewType) {
      this.refresh();
    }
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
      // console.log(res);
      return res.json();
    }).then(d => {
      // console.log("going to log jobs data from server: d");
      // console.log(d);
      this.setState({data: d}, () => {
        console.log("going to log this.statee");
        console.log(this.state);
        // console.log(JSON.stringify(this.state.data));
      });
    });
  }

  openModal(job) {
    this.setState({
      modalShown: true,
      applyModalData: job
    });
  }

  closeModal() {
    console.log("closeModal");
    this.setState({
      modalShown: false
    });
  }

  render() {
    let dataArr = [];
    if (this.state.data && this.state.data.length > 0) {
      // console.log("inside render, logging this.state.data");
      // console.log(this.state.data);
      const getColumn = (datum) => datum ? (
        <Col xs={24} sm={12} md={12} lg={12} key={'job' + datum.id}>
          <Job
            data={datum}
            imgSrc={datum.org.logo} title={datum.title}
            name={datum.org.name} date={new Date(datum.updated_at)}
            applyJob={ () => { this.openModal(datum); }} />
        </Col>
      ) : null;
      for (let i = 0; i < this.state.data.length; i += 2) {
        dataArr.push(
          <Row className="project-row clearfix" key={'job-row-' + i / 2}>
            { getColumn(this.state.data[i]) }
            { getColumn(this.state.data[i + 1]) }
          </Row>
        );
      }
    }

    const backgroundColor = this.props.viewType === 'casual' ?
      {backgroundColor: "#f0ce00"} : null;

    return (
      <div className="container-fluid jobs" style={backgroundColor}>
        <p className="text-center">Search the available listings...</p>
        <div className="clearfix">
          {dataArr}
        </div>
        <ApplyModal
          data={this.state.applyModalData}
          shown={this.state.modalShown}
          closeModal={ () => { this.closeModal(); }} />
      </div>
    );
  }
}

Jobs.propTypes = {
  viewType: React.PropTypes.string.isRequired
};

export default Jobs;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
