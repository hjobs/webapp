import React from 'react';
// import TimeAgo from 'react-timeago';
import { Modal, Button } from 'react-bootstrap';

class ApplyModal extends React.Component {

  render() {
    const job = this.props.data;
    let str;
    if (job) {
      const orgName = job.org.name.replace("&", "%26");
      const body = "Dear " + orgName + ",%0A%0AI am interested in your job " + job.title + ". Please contact me at: (ENTER YOUR INFO HERE)%0A%0ALook forward to your speedy reply,%0A(YOUR NAME HERE)";
      str =
        'mailto:' +
        job.org.email +
        '?subject=RE%20' +
        (job.title + ' - Hjobs.hk').replace(/\s|\r/g, "%20") +
        '&body=' +
        body.replace(/\s|\r/g, "%20");
      console.log(str);
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
            </p>
            {
              job.attachment_url ?
                <p>
                  <b>Attachment:</b>
                  <a href={job.attachment_url}>Link here</a>
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

// I am interested in your job " + job.title + ". Please contact me at: (ENTER YOUR INFO HERE)Look forward to your speedy reply,%0A";
