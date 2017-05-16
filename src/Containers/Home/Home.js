import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import JoImage from './jo.jpg';
import EdmundImage from './edmund.jpg';
import KhzeerImage from './khzeer.jpg';
import './styles/Home.css';

import { getEmailStr } from '../../services/var';
import { log } from '../../services/http';

import MiscStore, { MiscActions } from "../../stores/miscStore";
import TranslationStore from "../../stores/translationStore";

class Home extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0
    };
    this.stores = [MiscStore, TranslationStore];
    this.storeKeys = ["isDeveloper", "tStrings"];
  }

  componentDidMount() { log({name: "EnterPage", page: "Home", action: "Enter"}); }

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
    const str = getEmailStr('contactus');
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
                <Col xs={24} sm={12} md={12} lg={12} className="flex-col flex-vhCenter person-container">
                  <img src={KhzeerImage} alt="Khzeer" className="img-circle" />
                  <h4>{t.home.khzeerName}</h4>
                  <span className="title">{t.home.khzPosition}</span>
                  <p>{t.home.khzDescription}</p>
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
                onClick={() => { log({name: "OpenEmail", action: "Click", page: "Home", component: "ContactUs"}); }}
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
