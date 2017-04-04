import React from 'react';
// import TimeAgo from 'react-timeago';
import { Modal, Button } from 'react-bootstrap';

import Variable from '../../services/var';
import Http from '../../services/http';

class ApplyModal extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
    this.http = new Http();
  }

  render() {
    const t = this.props.t;
    let job, str, orgNames;
    if (this.props.shown) {
      job = this.props.data;
      str = this.vars.getEmailStr('application', job);
      orgNames = this.vars.getOrgsNames(job.orgs, false);
    }

    return this.props.shown ? (
      <Modal
        show={this.props.shown}
        enforceFocus
        dialogClassName="apply-job-modal"
      >
        <Modal.Header>{job.title}</Modal.Header>
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

        <Modal.Footer>
          <Button onClick={() => { this.props.closeModal(); }}>{t.buttons.close}</Button>
          <a onClick={() => { this.http.log({name: "OpenEmail", action: "Click", job_id: job.id, page: "ApplyModal"}); }} href={str}><Button> {t.applyModal.applyNow } </Button></a>
        </Modal.Footer>
      </Modal>
    ) : null;
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
