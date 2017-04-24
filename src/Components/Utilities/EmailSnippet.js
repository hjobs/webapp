import React from 'react';
import Reflux from 'reflux';
import Variable from '../../services/var';
import { withRouter } from 'react-router-dom';

// import UserStore from '../../stores/userStore';

class EmailSnippet extends Reflux.Component {

  render() {
    const job = this.props.data;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!job) return null;

    return (
      <div className="flex-col flex-vhCenter" style={{
        backgroundColor: "#0F0F0F",
        fontSize: "16px"
      }}>
        <p>
          Dear {Variable.getOrgsNames(job.orgs)}, <br /><br />
          I'm interested in your posting {job.title}. Please contact me via {!!user ? user.email : "_EMAIL_"}.<br /><br />
          Looking forward to your speedy reply,<br />
          {!!user ? user.name : "_NAME_"}
        </p>
      </div>
    );
  }
}

export default withRouter(EmailSnippet);