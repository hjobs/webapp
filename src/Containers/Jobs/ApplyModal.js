import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';
import { Button } from "semantic-ui-react";
import { Modal } from 'react-bootstrap';
let Loading = require('react-loading');
const queryString = require("query-string");
import './styles/applyModal.css';

import Variable from '../../services/var';
import Http from '../../services/http';

import ErrorDiv from '../../Components/Utilities/ErrorDiv';
import ApplyMessage from '../../Components/Job/ApplyMessage';
import Login from '../../Components/Login/Login';
import { Tags, Salary, Location, ShareButtons } from '../../Components/Job/JobComponents';

import JobStore from '../../stores/jobStore';
import TranslationStore from '../../stores/translationStore';
import UserStore from '../../stores/userStore';

class ApplyModalWithoutRouter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [TranslationStore, UserStore, JobStore];
  }

  toggleApply() {
    // determine from url whether user is applying
    const queryStr = this.props.location.search,
          query = queryString.parse(queryStr),
          isApplying = !!query.applying;
    let nextQueryStr = queryStr;
    if (isApplying) {
      nextQueryStr = queryStr.replace(/(\?applying|&applying)[^&]+/gi, "");
    } else {
      nextQueryStr = (queryStr + "&applying=true");
    }
    
    if (nextQueryStr !== queryStr) {
      this.props.history.push(
        this.props.location.pathname +
        nextQueryStr
      );
    }
  }

  renderBody() {
    const t = this.state.tStrings,
          modal = this.props.modal,
          job = modal.data,
          query = queryString.parse(this.props.location.search),
          applying = !!query.applying;

    let body;
    if (!modal.loading && !job) {
      body = (
        <Modal.Body bsClass="modal-body">
          <ErrorDiv />
        </Modal.Body>
      );
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
            <meta property="og:url"                content={location.href} />
            <meta property="og:title"              content={job.title} />
            <meta property="og:description"        content={job.orgs ? orgNames : job.description} />
            <meta property="og:image"              content="https://assets.hjobs.hk/Companies/HJobs/logo.png" />
            <div className="modal-body-content" style={{
              overflow: "scroll",
              height: "calc(100% - 30px)"
            }}>
              <Tags job={job} />
              <p>
                <b>Salary:</b><br />
                <Salary job={job} showBonus />
              </p>
              <p>
                <Location job={job} />
              </p>
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
                    <b>{t.applyModal.attachmentHeader}</b><br />
                    <a href={job.attachment_url}>{t.applyModal.attachmentLink}</a>
                  </p>
                  : null
              }
            </div>
            <ShareButtons job={job} style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0
            }} />
          </Modal.Body>
        );
      }
    } else { // applying
      const signedIn = !!this.state.authToken;
      body = (
        <Modal.Body bsClass="modal-body applying">
            {
              modal.loading ?
              <div className="flex-col flex-vhCenter"><Loading /></div>:
              <div className="flex-col flex-vhCenter" style={{overflow: "scroll", minHeight: "100%"}}>
                {//<EmailSnippet data={this.props.modal.data} />
                }
                <ApplyMessage user={this.state.user} />
                <div style={{height: "20px"}} />
                  {
                    signedIn ? null :
                    <Login />
                  }
                </div>
            }
        </Modal.Body>
      );
    }
    return body;
  }

  render() {
    const t = this.state.tStrings,
          modal = this.props.modal,
          query = queryString.parse(this.props.location.search),
          applying = !!query.applying,
          job = modal.data,
          appliedBefore = !!this.state.appliedJobs && !!job && this.state.appliedJobs.indexOf(job.id) !== -1;

    return (
      <Modal
        show={modal.show}
        enforceFocus
        dialogClassName="apply-job-modal"
      >
        <Modal.Header>{!!job ? job.title : ""}</Modal.Header>
        {this.renderBody()}
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
                disabled={modal.loading || (applying && !this.state.authToken)}
                loading={modal.loading}
                onClick={() => {
                  if (!applying) this.toggleApply();
                  else this.props.onConfirmApply();
                  Http.log({
                    name: "Apply",
                    action: "Click",
                    job_id: job.id,
                    target: !applying ? "Initiate" : "Send",
                    page: "ApplyModal"
                  });
                }}>
                <Button.Content>
                  {
                    !applying ?
                      t.applyModal.applyNow
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
