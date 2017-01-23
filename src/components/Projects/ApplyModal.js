import React from 'react';
import TimeAgo from 'react-timeago';
import { Modal, Button } from 'react-bootstrap';

class ApplyModal extends React.Component {
  openEmail() {
    const str =
      'mailto:' +
      this.props.data.org.employers[0].email +
      '?subject=RE%20' +
      this.props.data.title.replace(" ", "%20") +
      '&body=' +
      'Say a few words to introduce yourself!'.replace(" ", "%20");
    window.open(str);
    // const url = this.variable.baseUrl + 'employee/log/';
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body:
    // }).then(res => {
    //   console.log(res);
    //   return res.json();
    // }).then(d => {
    //   // console.log("going to log jobs data from server: d");
    //   // console.log(d);
    //   this.setState({data: d}, () => {
    //     console.log("going to log this.statee");
    //     console.log(this.state);
    //     // console.log(JSON.stringify(this.state.data));
    //   });
    // });
  }

  render() {
    // console.log("ApplyModal this.props.shown = " + this.props.shown);
    if (this.props.shown && this.props.data) {
      const job = this.props.data;
      const org = job.org;
      return (
        <Modal
          show={this.props.shown}
          dialogClassName="apply-modal"
        >
          
          <Modal.Body bsClass="modal-body">
            <h2>{job.title}</h2>
            <p>
              <b>About this job:</b> <br />
              {job.description}
            </p>
            <p>
              <b>Posted:</b><br />
              {org ? org.name : null}{'  '}
              <i><TimeAgo date={job.updated_at} /></i>
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.props.closeModal(); }}>Close</Button>
            <Button
              className="yellow-button"
              onClick={() => { this.openEmail(); }}>
              Apply Now
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
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
