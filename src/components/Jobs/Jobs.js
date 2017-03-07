import React from 'react';
import 'whatwg-fetch';
import { Grid, Row, Col } from 'react-bootstrap';

import Job from './Job';

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

  openModal(job) { this.props.openModal(job); }
  closeModal() { this.props.closeModal(); }

  render() {
    let dataArr = [];
    if (this.props.jobs && this.props.jobs.length > 0) {
      // console.log("inside render, logging this.props.jobs");
      // console.log(this.props.jobs);
      const getColumn = (datum) => {
        return !datum ? null : (
          <Col xs={24} sm={24} md={12} lg={12} key={'job' + datum.id} style={{paddingLeft: '5px', paddingRight: '5px'}}>
            <Job
              job={datum}
              applyJob={ () => { this.openModal(datum); }} />
          </Col>
        );
      };
      for (let i = 0; i < this.props.jobs.length; i += 2) {
        dataArr.push(
          <Row className="project-row clearfix" key={'job-row-' + i / 2}>
            { getColumn(this.props.jobs[i]) }
            { getColumn(this.props.jobs[i + 1]) }
          </Row>
        );
      }
    }

    return (
      <Grid fluid style={{maxWidth: "1000px", padding: "0px", backgroundColor: "#FFF"}}>
        {dataArr}
      </Grid>
    );
  }
}

Jobs.propTypes = {
  closeModal: React.PropTypes.func.isRequired,
  openModal: React.PropTypes.func.isRequired,
  viewType: React.PropTypes.string.isRequired,
  jobs: React.PropTypes.any.isRequired
};

export default Jobs;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
