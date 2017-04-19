import React from 'react';
// import TimeAgo from 'react-timeago';
import { Form, Input, Button } from "semantic-ui-react";
import { Modal } from 'react-bootstrap';

import Variable from '../../services/var';
import Http from '../../services/http';

class ApplyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.vars = new Variable();
    this.http = new Http();
  }

  getInitialState() {
    return {
      applying: false,
      application: {
        name: "",
        email: "",
        loading: false,
        errorMsg: null
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shown !== this.props.shown) {
      this.setState(() => this.getInitialState());
    }
  }

  onClickSend() {
    this.setState(s => {
      const email = s.application.email,
            name = s.application.name;
      if (!email || !name) { s.application.errorMsg = "Please fill in both fields"; return s; }
      if (email.split("@").length !== 2 || email.split("@")[1].split(".").length < 2) { s.application.errorMsg = "Please enter valid email address"; return s; }
      s.application.errorMsg = null;
      s.application.loading = true;
      return s;
    }, () => {
      if (!this.state.application.errorMsg) {
        const obj = {
          application: {
            email: this.state.application.email,
            name: this.state.application.name,
            org_id: this.props.data.id
          }
        };
        this.http.request("apply", "POST", obj)
        .then(res => {
          console.log(["res = ", res]);
          if (!res.ok) throw Error(res.statusText);
          return res.json();
        })
        .then(d => {
          console.log(["d = ", d]);
          if (!d) Error("Error in application. Check internet connection");
          this.setState(s => {
            s = this.getInitialState();
            let appliedJobsArray = JSON.parse(localStorage.getItem("appliedJobs"));
            if (!appliedJobsArray) appliedJobsArray = [];
            appliedJobsArray.push(this.props.data.id);
            localStorage.setItem("appliedJobs", JSON.stringify(appliedJobsArray));
            return s;
          });
        })
        .catch(err => {
          this.setState(s => {
            s.application.loading = false;
            s.application.errorMsg = err.toString();
          });
        });
      }
    });
  }
  toggleApply() { this.setState(s => { s.applying = !this.state.applying; }); }

  render() {
    if (!this.props.shown) return null;

    const t = this.props.t,
          applying = this.state.applying,
          application = this.state.application,
          job = this.props.data,
          appliedJobsArray = JSON.parse(localStorage.getItem("appliedJobs")),
          appliedBefore = !!appliedJobsArray && appliedJobsArray.indexOf(this.props.data.id) !== -1,
          // emailStr = this.vars.getEmailStr('application', job),
          orgNames = this.vars.getOrgsNames(job.orgs, false),
          body = !applying ? (
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
          ) : (
            <Modal.Body bsClass="modal-body applying">
              <Form
                loading={this.state.application.loading}
                className="flex-col flex-vhCenter text-center full-width full-height"
              >
                <p>Just give us your name and email, and we will send your application through!</p>
                <Form.Group inline>
                  <Form.Field
                    placeholder="Your name"
                    control="input"
                    value={application.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      this.setState(s => { s.application.name = val; return s; });
                    }}
                  />
                </Form.Group>
                <Form.Group inline>
                  <Form.Field
                    placeholder="Your email"
                    control="input"
                    value={application.email}
                    onChange={(e) => {
                      const val = e.target.value;
                      this.setState(s => { s.application.email = val; return s; });
                    }}
                  />
                </Form.Group>
                <p className="red-text" style={{marginTop: "10px"}}>
                  {this.state.application.errorMsg}
                </p>
              </Form>
            </Modal.Body>
          );

    return (
      <Modal
        show={this.props.shown}
        enforceFocus
        dialogClassName="apply-job-modal"
      >
        <Modal.Header>{job.title}</Modal.Header>
        {body}

        <Modal.Footer className={!applying ? null : "black"}>
          <Button
            size="large"
            className="transparent"
            disabled={this.state.application.loading}
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
                disabled={this.state.application.loading}
                onClick={() => {
                  if (!applying) this.toggleApply();
                  else this.onClickSend();
                  this.http.log({
                    name: !applying ? "ClickApplyNow" : "ClickSendNow",
                    action: "Click",
                    job_id: job.id,
                    page: "ApplyModal"
                  });
                }}>
                {!applying ? t.applyModal.applyNow : t.applyModal.sendNow}
              </Button>
          }
        </Modal.Footer>
      </Modal>
    );
  }
}

ApplyModal.propTypes = {
  data: React.PropTypes.any,
  closeModal: React.PropTypes.func.isRequired,
  shown: React.PropTypes.bool.isRequired,
  t: React.PropTypes.any.isRequired
};
// <Modal.Header>
//           <Modal.Title id="contained-modal-title-lg">{job.title}</Modal.Title>
//         </Modal.Header>

export default ApplyModal;

// I am interested in your job " + job.title + ". Please contact me at: (ENTER YOUR INFO HERE)Look forward to your speedy reply,%0A";
