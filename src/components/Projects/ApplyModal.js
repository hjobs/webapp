import React from 'react';
// import TimeAgo from 'react-timeago';
import { Modal, Button } from 'react-bootstrap';

class ApplyModal extends React.Component {
  render() {
    if (this.props.shown && this.props.data) {
      const project = this.props.data;
      const org = project.orgs[0];
      const orgName = org.name.replace("&", "%26");
      const body = "Dear " + orgName + ",%0A%0AI am interested in your job " + project.title + ". Please contact me at: (ENTER YOUR INFO HERE)%0A%0ALook forward to your speedy reply,%0A(YOUR NAME HERE)";
      const mailStr =
        'mailto:' +
        org.email +
        '?subject=RE%20' +
        (project.title + ' - Hjobs.hk').replace(" ", "%20") +
        '&body=' +
        body.replace(" ", "%20");
      return (
        <Modal
          show={this.props.shown}
          dialogClassName="apply-modal">

          <Modal.Body bsClass="modal-body">
            <h2>{project.title}</h2>
            <p>
              <b>About this project:</b> <br />
              {project.description}
            </p>
            <p>
              <b>Posted:</b><br />
              {org ? org.name : null}{'  '}
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.props.closeModal(); }}>Close</Button>
            <a href={mailStr}><Button className="yellow-button">
              Apply Now
            </Button></a>
          </Modal.Footer>
        </Modal>
      );
    }
    return null;
  }
}

ApplyModal.propTypes = {
  data: React.PropTypes.any.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  shown: React.PropTypes.bool.isRequired
};
// <Modal.Header>
//           <Modal.Title id="contained-modal-title-lg">{job.title}</Modal.Title>
//         </Modal.Header>

export default ApplyModal;
