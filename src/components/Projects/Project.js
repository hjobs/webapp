import React from 'react';
import TimeAgo from 'react-timeago';
import { Button } from 'react-bootstrap';

class Project extends React.Component {
  render() {
    const org = this.props.data.org;
    return this.props.data ? (
      <div className="project-container flex-row">
        <div className="thumbnail-container flex-col flex-vCenter">
          <img src={org ? org.logo : null} className="thumbnail" alt={org ? org.name : null} />
        </div>
        <div className="detail-container">
          <h4>{this.props.data.title}</h4>
          <p>
            {org ? <span>org.name <br /></span> : null}
            Updated <i><TimeAgo date={this.props.data.updated_at} /></i>
          </p>
          <Button
            bsSize="small"
            className="yellow-button show-me-more-button"
            onClick={() => { this.props.applyProject(); }}>
            show me more
          </Button>
        </div>
      </div>
    ) : null;
  }
}

Project.propTypes = {
  data: React.PropTypes.any.isRequired,
  applyProject: React.PropTypes.func.isRequired
};

export default Project;
