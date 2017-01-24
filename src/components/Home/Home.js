import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
  openEmail() {
    const str =
      'mailto:info@hjobs.hk' +
      '?subject=RE%20' +
      'Inquiry'.replace(" ", "%20") +
      '&body=' +
      'Let us know what your inquiry is :)'.replace(" ", "%20");
    window.open(str);
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
    return (
      <div className="container-fluid home flex-col">
        <div className="about-banner-container flex-col flex-vhCenter text-center full-width">
          <div className="about-banner flex-col flex-vhCenter">
            <h2>Build Your Career</h2>
            <p>
              Looking for an easy way to find jobs and hire within the hospitality industry? <br />
              Wanting to find some part-time freelance hospitality projects? Or someone to do them?
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
            <p>We are a non-profit website setup to help hospitality employers and employees’ connect. In addition to job postings, we also encourage businesses to post projects <i>i.e. re-design a restaurant menu, doing in-depth research on potential markets,</i> that can then be completed by any competitive individual! </p>
          </div>
        </div>
        {('COMMENTED OUT ABOUT-FEATURE SECTION DOWN BELOW' !== null) ? null : null}
        <div className="about-team-container flex-col flex-vhCenter text-center full-width">
          <div className="about-team flex-col flex-vhCenter">
            <h2>Our Team</h2>
            <Grid className="full-width">
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src="./dist/images/jo.jpg" alt="Jonathan" className="img-circle" />
                  <h4>Jo Sutton</h4>
                  <span className="title">Co-founder & CEO</span>
                  <p>Jo is interested in actively solving some of the markets troublesome realities of online employment, in hospitality. He is actively in charge of Hjobs.hk’s strategic and day-to-day operations. </p>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src="./dist/images/edmund.jpg" alt="Edmund" className="img-circle" />
                  <h4>Edmund To</h4>
                  <span className="title">Co-founder & CIO</span>
                  <p>Edmund is a young developer, aspiring to solve pressing impactful problems. He is excited to build a product loved by end-users, through leveraging the flexibility of startups.</p>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        <div className="contact-container flex-col flex-vhCenter text-center full-width">
          <div className="contact flex-col flex-vhCenter">
            <h2>Contact Us</h2>
            <p>Email:{' '}
              <span
                className="link"
                onClick={() => { this.openEmail(); }}>
                <u>info@hjobs.hk</u>
              </span>
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

// <div className="about-feature-container flex-col flex-vhCenter text-center full-width">
//           <div className="about-feature flex-col flex-vhCenter">
//             <Grid className="full-width">
//               <Row className="show-grid">
//                 <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
//                   <i className="fa fa-users" aria-hidden="true"></i>
//                   <h4> Title </h4>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
//                 </Col>
//                 <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
//                   <i className="fa fa-users" aria-hidden="true"></i>
//                   <h4> Title </h4>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
//                 </Col>
//                 <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
//                   <i className="fa fa-users" aria-hidden="true"></i>
//                   <h4> Title </h4>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
//                 </Col>
//                 <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
//                   <i className="fa fa-users" aria-hidden="true"></i>
//                   <h4> Title </h4>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
//                 </Col>
//                 <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
//                   <i className="fa fa-users" aria-hidden="true"></i>
//                   <h4> Title </h4>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
//                 </Col>
//                 <Col xs={24} sm={12} md={8} lg={8} className="flex-col flex-vhCenter column">
//                   <i className="fa fa-users" aria-hidden="true"></i>
//                   <h4> Title </h4>
//                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lobortis neque, ac laoreet lectus.</p>
//                 </Col>
//               </Row>
//             </Grid>
//           </div>
//         </div>