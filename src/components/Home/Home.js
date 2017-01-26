import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
  openEmail() {
    
    // window.open(str);
    // const url = this.variable.baseUrl + 'employee/log/';
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body:
    // }).then(res => {
    //   console.log(res);
    //   return res.json();
    // }).then(d => {
    //   // console.log("going to log jobs data from server: d");
    //   // console.log(d);
    //   this.setState({data: d}, () => {
    //     console.log("going to log this.statee");
    //     console.log(this.state);
    //     // console.log(JSON.stringify(this.state.data));
    //   });
    // });
  }

  render() {
    const str =
      'mailto:info@hjobs.hk' +
      '?subject=RE%20' +
      'Inquiry'.replace(" ", "%20") +
      '&body=' +
      'Let us know what your inquiry is :)'.replace(" ", "%20");
      
    return (
      <div className="container-fluid home flex-col">
        <div className="about-banner-container flex-col flex-vhCenter text-center full-width">
          <div className="about-banner flex-col flex-vhCenter">
            <h2>Build Your Career</h2>
            <p>
              Are you looking for work? Click on 1 of the 3 circles: “looking for a quick job”, “looking for a long term job” or “looking for a project”. Are you looking for people? Click the black circle “looking to post jobs or projects”
            </p>
          </div>
        </div>
        <div className="about-choice-container flex-col flex-vhCenter text-center full-width">
          <div className="about-choice flex-col flex-vhCenter">
            <Grid>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
                  <div
                    onClick={() => { this.props.goToPage(2, "casual"); }}
                    className="div-circle div-circle-big flex-row flex-vhCenter">
                    <h3>Looking for a quick job?</h3>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
                  <div
                    onClick={() => { this.props.goToPage(2, "stable"); }}
                    className="div-circle div-circle-big flex-row flex-vhCenter">
                    <h3>Looking for a stable job?</h3>
                  </div>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
                  <div
                    onClick={() => { this.props.goToPage(3); }}
                    className="div-circle div-circle-small flex-row flex-vhCenter">
                    <div className="text-center">
                      <span className="project-1">Looking for a project?</span>
                      <span className="project-2"> (market research, consultancy)</span>
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
                  <div
                    onClick={() => { window.open("http://hjobs-admin.bitballoon.com"); }}
                    className="div-circle div-circle-small flex-row flex-vhCenter">
                    <h4>Looking to post jobs or projects?</h4>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        <div className="about-intro-container flex-col flex-vhCenter text-center full-width">
          <div className="about-intro flex-col flex-vhCenter">
            <h2>Our Service</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus. Pellentesque pellentesque bibendum consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus. Pellentesque pellentesque bibendum consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus. Pellentesque pellentesque bibendum consectetur.</p>
          </div>
        </div>
        <div className="about-feature-container flex-col flex-vhCenter text-center full-width">
          <div className="about-feature flex-col flex-vhCenter">
            <Grid className="full-width">
              <Row className="show-grid">
                <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <h4> Title </h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <h4> Title </h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <h4> Title </h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <h4> Title </h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <h4> Title </h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
                  <i className="fa fa-users" aria-hidden="true"></i>
                  <h4> Title </h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        <div className="about-team-container flex-col flex-vhCenter text-center full-width">
          <div className="about-team flex-col flex-vhCenter">
            <h2>Our Team</h2>
            <Grid className="full-width">
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src="./dist/images/jo.jpg" alt="Jonathan" className="img-circle" />
                  <h4>Jo Sutton</h4>
                  <span className="title">CEO</span>
                  <p>Jo has worked within the hospitality industry for 10 + years from restaurants, bars to hotels. He understands the frustration of trying to find jobs within the industry and is looking to help hospitality seekers find employment and fulfillment.</p>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src="./dist/images/edmund.jpg" alt="Jonathan" className="img-circle" />
                  <h4>Edmund To</h4>
                  <span className="title">CIO</span>
                  <p>Edmund is an aspiring young graduate…</p>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        <div className="contact-container flex-col flex-vhCenter text-center full-width">
          <div className="contact flex-col flex-vhCenter">
            <h2>Contact Us</h2>
            <p>Email:{' '}
              <a
                className="link"
                href={str}>
                <u>info@hjobs.hk</u>
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  goToPage: React.PropTypes.func.isRequired
};

export default Home;
