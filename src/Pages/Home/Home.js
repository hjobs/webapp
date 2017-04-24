import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import JoImage from './jo.jpg';
import EdmundImage from './edmund.jpg';

import Variable from '../../services/var';
import Http from '../../services/http';

import MiscStore, { MiscActions } from "../../stores/miscStore";
import TranslationStore from "../../stores/translationStore";

class Home extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalData: null,
      clickCount: 0
    };
    this.stores = [MiscStore, TranslationStore];
  }

  componentDidMount() { Http.log({name: "EnterPage", page: "Home", action: "Enter"}); }

  listenForDeveloper() {
    if (this.state.isDeveloper || this.state.clickCount === null) return;
    this.setState(s => {
      if (this.state.clickCount !== null && this.state.clickCount < 9) s.clickCount++;
      return s;
    }, () => {
      if (this.state.clickCount >= 9) {
        MiscActions.enableDeveloper();
        this.setState(s => {
          s.clickCount = null;
        });
      } else {
        window.setTimeout(() => {
          if (this.state.clickCount === null) return;
          this.setState(s => {
            s.clickCount--;
            return s;
          });
        }, 1800);
      }
    });
  }

  openModal(job) { this.setState(s => { s.modalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalData = null; return s; }); }

  render() {
    const str = Variable.getEmailStr('contactus');
    const t = this.state.tStrings;
    console.log(["home.js, logging this.props and this.state", this.props, this.state]);

    return (
      <div className="container-fluid home flex-col">
        { /* hero banner */ }
        <div className="about-banner-container flex-col flex-vhCenter text-center full-width">
          <div className="about-banner flex-col flex-vhCenter">
            <h2 onClick={() => { this.listenForDeveloper(); }}>{t.home.hero}</h2>
          </div>
        </div>

        { /* circles
        <div className="about-choice-container flex-col flex-vhCenter text-center full-width">
          <div className="about-choice flex-col flex-vhCenter">
            <Grid>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
                  <div
                    onClick={() => { this.props.goToPage(2, "quick"); }}
                    className="div-circle div-circle-small flex-row flex-vhCenter">
                    <h3>View Jobs</h3>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-row flex-vhCenter">
                  <div
                    onClick={() => { window.open("http://admin.hjobs.hk"); }}
                    className="div-circle div-circle-small flex-row flex-vhCenter">
                    <h3>Post Jobs</h3>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
        */ }

        {/* Our Service */}
        <div className="about-intro-container flex-col flex-vhCenter text-center full-width">
          <div className="about-intro flex-col flex-vhCenter">
            <h2>{t.home.serviceHeader}</h2>
            <p>{t.home.serviceBody}</p>
          </div>
        </div>

        {/* Team */}
        <div className="about-team-container flex-col flex-vhCenter text-center full-width">
          <div className="about-team flex-col flex-vhCenter">
            <h2>{t.home.teamHeader}</h2>
            <Grid className="full-width">
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src={JoImage} alt="Jonathan" className="img-circle" />
                  <h4>{t.home.joName}</h4>
                  <span className="title">{t.home.joPosition}</span>
                  <p>{t.home.joDescription}</p>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src={EdmundImage} alt="Edmund" className="img-circle" />
                  <h4>{t.home.edName}</h4>
                  <span className="title">{t.home.edPosition}</span>
                  <p>{t.home.edDescription}</p>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>

        {/* Contact Us*/}
        <div className="contact-container flex-col flex-vhCenter text-center full-width">
          <div className="contact flex-col flex-vhCenter">
            <h2>{t.home.contactHeader}{this.state.isDeveloper ? "!" : null}</h2>
            <p>{t.home.contactEmail}{': '}
              <a
                className="link"
                onClick={() => { Http.log({name: "OpenEmail", action: "Click", page: "Home", component: "ContactUs"}); }}
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

export default Home;

// <div className="about-feature-container flex-col flex-vhCenter text-center full-width">
//           <div className="about-feature flex-col flex-vhCenter">
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