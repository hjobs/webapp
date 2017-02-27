import React from 'react';
// import TimeAgo from 'react-timeago';
import { Modal, Button } from 'react-bootstrap';

import Variable from '../../var';

class ApplyModal extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  render() {
    let job, str, orgNames;
    if (this.props.shown) {
      job = this.props.data;
      str = this.vars.getEmailStr('application', job);
      orgNames = this.vars.getOrgsNames(job.orgs);
    }

    return this.props.shown ? (
      <Modal
        show={this.props.shown}
        dialogClassName="apply-job-modal"
      >
        <Modal.Body bsClass="modal-body">
          <h2>{job.title}</h2>
          <p>
            <b>About this job:</b> <br />
            {job.description}
          </p>
          <p>
            <b>Posted by:</b><br />
            {orgNames}{'  '}
          </p>
          {
            job.attachment_url ?
              <p>
                <b>Attachment:</b>{' '}
                <a href={job.attachment_url}>Link here, check it out!</a>
              </p>
              : null
          }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => { this.props.closeModal(); }}>Close</Button>
          <a href={str}><Button className="yellow-button">
            Apply Now
          </Button></a>
        </Modal.Footer>
      </Modal>
    ) : null;
  }
}

ApplyModal.propTypes = {
  data: React.PropTypes.any,
  closeModal: React.PropTypes.func.isRequired,
  shown: React.PropTypes.bool.isRequired
};
// <Modal.Header>
//           <Modal.Title id="contained-modal-title-lg">{job.title}</Modal.Title>
//         </Modal.Header>

export default ApplyModal;

// I am interested in your job " + job.title + ". Please contact me at: (ENTER YOUR INFO HERE)Look forward to your speedy reply,%0A";
