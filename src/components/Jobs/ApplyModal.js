import React from 'react';
import TimeAgo from 'react-timeago';
import { Modal, Button } from 'react-bootstrap';

class ApplyModal extends React.Component {

  render() {
    const job = this.props.data;
    let str;
    if (job) {
      str =
        'mailto:' +
        this.props.data.org.employers[0].email +
        '?subject=RE%20' +
        this.props.data.title.replace(" ", "%20") +
        '&body=' +
        'Say a few words to introduce yourself!'.replace(" ", "%20");
    }
    // console.log("ApplyModal this.props.shown = " + this.props.shown);
    if (this.props.shown) {
      return (
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
              {job.org.name}{'  '}
              <i><TimeAgo date={job.updated_at} /></i>
            </p>
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={() => { this.props.closeModal(); }}>Close</Button>
            <a href={str}><Button className="yellow-button">
              Apply Now
            </Button></a>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
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
