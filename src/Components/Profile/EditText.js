/** @typedef {'quick'|'stable'|'internship'|'project'} JobType */

import React from 'react';
import Reflux from 'reflux';
import { TextArea } from 'semantic-ui-react';
// import { Redirect } from 'react-router-dom';

// import  from '../../Components/Profile/';

import UserStore, { UserActions } from '../../stores/userStore';

// import Variable from '../../services/var';
// import Http from '../../services/http';

class EditText extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = UserStore;
  }

  render() {

    return (
      React.createElement(
        this.props.domType || "input",
        {
          type: this.props.inputType,
          disabled: this.state.profile.loading,
          className: "edit-text full-width",
          style: this.props.style || null,
          value: this.state.profile.editing.data,
          onKeyDown: (event) => { if (event.which === 13 && !this.props.doNotSubmitOnEnter) UserActions.submitProfileEdit(); },
          onChange: (event) => { UserActions.editProfileItem(event.target.value); }
        }
      )
      // <input
      //   autoFocus
      //   style={this.props.style || null}
      //   value={this.state.profile.editing.data}
      //   onChange={(event) => {
      //     UserActions.editProfileItem(event.target.value);
      //   }}
      // />
    );
  }
}

export default EditText;
