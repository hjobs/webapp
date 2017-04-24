/** @typedef {id: number, otherAttributes: any} jobObject */

import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';
// import TimeAgo from 'react-timeago';
import { Button } from "semantic-ui-react";
import { Modal } from 'react-bootstrap';
let Loading = require('react-loading');
const queryString = require("query-string");

import Variable from '../../services/var';
import Http from '../../services/http';

import ErrorDiv from '../../Components/Utilities/ErrorDiv';
import EmailSnippet from '../../Components/Utilities/EmailSnippet';

import JobStore from '../../stores/jobStore';
import TranslationStore from '../../stores/translationStore';
import UserStore from '../../stores/userStore';

class ApplyModalWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      appliedJobs: localStorage.getItem("appliedJobs") || null
    };
    this.stores = [TranslationStore, UserStore, JobStore];
    // this.modifyState(props);
  }

  componentWillReceiveProps() {
    this.setState(s => {
      s.appliedJobs = localStorage.getItem("appliedJobs") || null;
      return s;
    });
  }

  toggleApply() {
    const queryStr = this.props.location.search,
          query = queryString.parse(queryStr),
          isApplying = !!query.applying;
    let nextQueryStr = queryStr;
    if (isApplying) {
      const applyingRegExp = /(\?applying|&applying)[^&]+/gi;
      nextQueryStr = queryStr.replace(applyingRegExp, "");
    } else {
      const userIsLoggedIn = localStorage.getItem("authToken") || false;
      if (userIsLoggedIn) {
        nextQueryStr = (queryStr + "&applying=true");
      } else {
        return window.open(Http.baseUrl + "auth/google", "_self");
      }
    }
    
    if (nextQueryStr !== queryStr) {
      this.props.history.replace(
        this.props.location.pathname +
        nextQueryStr
      );
    }
  }

  render() {
    const t = this.state.tStrings,
          modal = this.props.modal,
          query = queryString.parse(this.props.location.search),
          applying = !!query.applying,
          job = modal.data,
          appliedBefore = !!this.state.appliedJobs && !!job && this.state.appliedJobs.indexOf(job.id) !== -1,
          signedIn = !!localStorage.getItem("authToken");
    let body;
    if (!modal.loading && !job) {
      body = <Modal.Body bsClass="modal-body"><ErrorDiv /></Modal.Body>;
    } else if (!applying) {
      if (modal.loading) {
        body = (
          <Modal.Body bsClass="modal-body">
            <Loading />
          </Modal.Body>
        );
      } else {
        const orgNames = Variable.getOrgsNames(job.orgs, false);
        body = (
          <Modal.Body bsClass="modal-body">
            <p>
              <b>{t.applyModal.aboutJob}</b> <br />
              {job.description}
            </p>
            <p>
              <b>{t.applyModal.postedBy}</b><br />
              {orgNames}{'  '}
            </p>
            {
              job.attachment_url ?
                <p>
                  <b>{t.applyModal.attachmentHeader}</b>{' '}
                  <a href={job.attachment_url}>{t.applyModal.attachmentLink}</a>
                </p>
                : null
            }
          </Modal.Body>
        );
      }
    } else {
      body = !modal.loading ? (
        <Modal.Body bsClass="modal-body applying">
          <div className="flex-col flex-vhCenter full-height">
            <EmailSnippet data={this.props.modal.data} />
          </div>
        </Modal.Body>
      ) : (
        <Modal.Body bsClass="modal-body applying">
          <div className="flex-col flex-vhCenter full-height">
            <Loading />
          </div>
        </Modal.Body>
      );
    }

    return (
      <Modal
        show={modal.show}
        enforceFocus
        dialogClassName="apply-job-modal"
      >
        <Modal.Header>{!!job ? job.title : ""}</Modal.Header>
        {body}
        <Modal.Footer className={!applying ? null : "black"} style={{borderTop: (!!applying ? "0px" : "0.5px solid #DDD")}}>
          <Button
            size="large"
            className="transparent"
            disabled={modal.loading}
            onClick={() => {
              if (!applying) this.props.closeModal();
              else this.toggleApply();
            }}
          >{!applying ? t.buttons.close : t.buttons.back}
          </Button>
          {
            appliedBefore ?
              <Button size="large" disabled color="green">You've applied!</Button> :
              <Button
                size="large"
                className="inverse"
                disabled={modal.loading}
                loading={modal.loading}
                onClick={() => {
                  if (!applying) this.toggleApply();
                  else this.props.onConfirmApply();
                  Http.log({
                    name: !applying ? "ClickApplyNow" : "ClickSendNow",
                    action: "Click",
                    job_id: job.id,
                    target: !applying && !signedIn ? "Login" : "Apply",
                    page: "ApplyModal"
                  });
                }}>
                <Button.Content>
                  {
                    !applying ?
                      (signedIn ? t.applyModal.applyNow : t.applyModal.loginAndApplyNow)
                      :
                      t.applyModal.sendNow
                  }
                </Button.Content>
              </Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

const ApplyModal = withRouter(ApplyModalWithoutRouter);

export default ApplyModal;

// I am interested in your job " + job.title + ". Please contact me at: (ENTER YOUR INFO HERE)Look forward to your speedy reply,%0A";
// <Form
//   loading={this.state.application.loading}
//   className="flex-col flex-vhCenter text-center full-width full-height"
// >
//   <p>Just give us your name and email, and we will send your application through!</p>
// <Form.Group inline>
//     <Form.Field
//       placeholder="Your name"
//       control="input"
//       value={application.name}
//       onChange={(e) => {
//         const val = e.target.value;
//         this.setState(s => { s.application.name = val; return s; });
//       }}
//     />
//   </Form.Group>
//   <Form.Group inline>
//     <Form.Field
//       placeholder="Your email"
//       control="input"
//       value={application.email}
//       onChange={(e) => {
//         const val = e.target.value;
//         this.setState(s => { s.application.email = val; return s; });
//       }}
//     />
//   </Form.Group>
//   <p className="red-text" style={{marginTop: "10px"}}>
//     {this.state.application.errorMsg}
//   </p>
// </Form>
