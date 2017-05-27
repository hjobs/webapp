import React from 'react';
import Reflux from 'reflux';
import { Image } from 'semantic-ui-react';
import Themes from '../../styles/theme';

import SaveCancel from './SaveCancel';
import FileInput from '../Utilities/FileInput'
import ErrorDiv from '../Utilities/ErrorDiv'

import UserStore, { UserActions } from '../../stores/userStore';

class ProfilePicture extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = UserStore;
  }

  render() {
    const imageSize = this.props.imageSize || "100px",
          editing = this.state.profile.editing.key === "image",
          errorMsg = this.state.profile.errorMsg;
    return (
      <div className="flex-col flex-vhCenter">
        <Image
          shape="circular"
          src={this.state.user.image}
          style={{
            height: imageSize,
            width: imageSize,
            cursor: "pointer",
            border: !editing ? "0px" : "1px solid " + Themes.colors.linkBlue
          }}
          onClick={() => {
            if (!this.state.profile.editing.key) UserActions.editProfileItem(null, "image")
          }}
          alt="profile image"
        />
        {
          !editing ? null :
          [
            <FileInput
              key="profile-picture-file-input"
              handleChange={(file) => {
                if (!file) return;
                UserActions.editProfileItem(file);
              }}
              style={{
                padding: "12px 0px 3px"
              }}
            />,
            <SaveCancel
              key="profile-picture-save-cancel"
              style={{
                padding: "3px 0px 7px"
              }}
            />,
            <p
              key="profile-picture-error-msg"
              className="text-red"
              children={errorMsg}
            />
          ]
        }
      </div>
    );
  }
}

export default ProfilePicture;
