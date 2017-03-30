import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// import Search from '../Search/Search';
import Jobs from '../Jobs/Jobs';
import ApplyModal from '../Jobs/ApplyModal';
import Description from '../Traffic/Description';

import Variable from '../../services/var';
import Http from '../../services/http';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
    this.http = new Http();
    this.state = {
      clickCount: this.vars.isDeveloper() ? null : 0,
      modalData: null
    };
  }

  componentDidMount() { this.http.log({name: "Enter", page: "Home", action: "Enter"}); }

  listenForDeveloper() {
    if (this.state.clickCount === null) return;
    this.setState(s => {
      s.clickCount++;
      if (s.clickCount >= 9) {
        this.http.log({name: "EnableDeveloper", page: "Home", action: "Click", component: "HeroBanner"});

        this.vars.enableDeveloper();
        s.clickCount = null;
      }
      return s;
    }, () => {
      window.setTimeout(() => {
        if (this.state.clickCount === null) return;
        this.setState(s => {
          s.clickCount--;
          return s;
        });
      }, 1800);
    });
  }

  openModal(job) { this.setState(s => { s.modalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalData = null; return s; }); }

  render() {
    const str = this.vars.getEmailStr('contactus');

    return (
      <div className="container-fluid home flex-col">
        {/* hero banner */}      
        <div className="about-banner-container flex-col flex-vhCenter text-center full-width">
          <div className="about-banner flex-col flex-vhCenter">
            <h2 onClick={() => { this.listenForDeveloper(); }}>Connecting everyday people to hospitality</h2>
          </div>
        </div>

        {/* Our Service */}
        <div className="about-intro-container flex-col flex-vhCenter text-center full-width">
          <div className="about-intro flex-col flex-vhCenter">
            <h2>Our Service</h2>
            <p>We are a non-profit website setup to help hospitality employers and employees’ connect. In addition to job postings, we also encourage businesses to post projects <i>i.e. re-design a restaurant menu, doing in-depth research on potential markets,</i> that can then be completed by any competitive individual! </p>
          </div>
        </div>

        {/* Team */}
        <div className="about-team-container flex-col flex-vhCenter text-center full-width">
          <div className="about-team flex-col flex-vhCenter">
            <h2>Our Team</h2>
            <Grid className="full-width">
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src="./resources/jo.jpg" alt="Jonathan" className="img-circle" />
                  <h4>Jo Sutton</h4>
                  <span className="title">Co-founder & CEO</span>
                  <p>Jo is interested in actively solving some of the markets troublesome realities of online employment, in hospitality. He is actively in charge of Hjobs.hk’s strategic and day-to-day operations. </p>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src="./resources/edmund.jpg" alt="Edmund" className="img-circle" />
                  <h4>Edmund To</h4>
                  <span className="title">Co-founder & CIO</span>
                  <p>Edmund is a young developer, aspiring to solve pressing impactful problems. He is excited to build a product loved by end-users, through leveraging the flexibility of startups.</p>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>

        {/* Contact Us*/}
        <div className="contact-container flex-col flex-vhCenter text-center full-width">
          <div className="contact flex-col flex-vhCenter">
            <h2>Contact {this.vars.isDeveloper() ? "Me" : "Us"}</h2>
            <p>Email:{' '}
              <a
                className="link"
                onClick={() => { this.http.log({name: "OpenEmail", action: "Click", page: "Home", component: "ContactUs"}); }}
                href={str}>
                <u>info@hjobs.hk</u>
              </a>
            </p>
            <a href="https://www.facebook.com/info.Hjobs.hk/" className="social-button"><i className="fa fa-facebook-square link" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  jobs: React.PropTypes.any.isRequired,
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
            // <Grid>
            //   <Row className="show-grid">
            //     <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
            //       <div
            //         onClick={() => { this.props.goToPage(2, "quick"); }}
            //         className="div-circle div-circle-big flex-row flex-vhCenter">
            //         <h3>Looking for a quick job?</h3>
            //       </div>
            //     </Col>
            //     <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
            //       <div
            //         onClick={() => { this.props.goToPage(2, "stable"); }}
            //         className="div-circle div-circle-big flex-row flex-vhCenter">
            //         <h3>Looking for a stable job?</h3>
            //       </div>
            //     </Col>
            //   </Row>
            //   <Row className="show-grid">
            //     <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
            //       <div
            //         onClick={() => { this.props.goToPage(2, "project"); }}
            //         className="div-circle div-circle-small flex-row flex-vhCenter">
            //         <div className="text-center">
            //           <span className="project-1">Looking for a project?</span>
            //           <span className="project-2"> (market research, consultancy)</span>
            //         </div>
            //       </div>
            //     </Col>
            //     <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
            //       <div
            //         onClick={() => { window.open("http://admin.hjobs.hk"); }}
            //         className="div-circle div-circle-small flex-row flex-vhCenter">
            //         <h4>Looking to post jobs or projects?</h4>
            //       </div>
            //     </Col>
            //   </Row>
            // </Grid>
      /* Featured jobs
        <div className="about-choice-container flex-col flex-vhCenter text-center full-width">
          <div className="jobs full-width flex-col flex-vhCenter">
            <Description />
            {this.props.loading ? <div style={{height: "120px"}} /> :
              <Jobs
                openModal={(job) => { this.openModal(job); }}
                jobs={this.props.jobs}
              />
            }
            <div style={{marginTop: "15px"}}>
              <span className="link" onClick={() => { this.props.goToPage(2, "quick"); }} style={{textDecoration: "underline"}}>
                view all jobs
              </span>
            </div>
            <ApplyModal
              data={this.state.modalData}
              shown={!!this.state.modalData}
              closeModal={() => { this.closeModal(); }}
            />
          </div>
        </div>
        */