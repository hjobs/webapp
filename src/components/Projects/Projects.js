import React from 'react';
import 'whatwg-fetch';
import { Clearfix, Row, Col } from 'react-bootstrap';

import Project from './Project';
import ApplyModal from './ApplyModal';

import Variable from '../../var';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShown: false,
      data: null
    };
    this.variable = new Variable();
  }

  componentDidMount() {
    const url = this.variable.baseUrl + 'employee/projects';
    console.log("Jobs.component did mount, url = " + url);
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(d => {
      console.log("going to log jobs data from server: d");
      console.log(d);
      d = d.map((datum) => {
        datum.org = datum.orgs[0];
        return datum;
      });
      this.setState({data: d}, () => {
        console.log("going to log this.statee");
        console.log(this.state);
        // console.log(JSON.stringify(this.state.data));
      });
    });
  }

  openModal(data) {
    this.setState({
      modalShown: true,
      applyModalData: data
    });
  }

  closeModal() {
    // console.log("closeModal");
    this.setState({
      modalShown: false
    });
  }

  render() {
    let dataArr = [];
    if (this.state.data && this.state.data.length > 0) {
      console.log("inside render, logging this.state.data");
      console.log(this.state.data);
      const getColumn = (datum) => (
        <Col xs={24} sm={12} md={12} lg={12}>
          <Project
            data={datum}
            applyProject={ () => { this.openModal(datum); } } />
        </Col>
      );
      for (let i = 0; i < this.state.data.length; i += 2) {
        dataArr.push(
          <Row className="project-row clearfix">
            { getColumn(this.state.data[i]) }
            { getColumn(this.state.data[i + 1]) }
          </Row>
        );
      }
    }

    return (
      <div className="container-fluid projects">
        <p className="text-center">Search for cool projects...</p>
        {dataArr}
        <ApplyModal
          data={this.state.applyModalData}
          shown={this.state.modalShown}
          closeModal={ () => { this.closeModal(); }} />
      </div>
    );
  }
}

// Projects.propTypes = {
//   viewType: React.PropTypes.string.isRequired
// };

export default Projects;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
