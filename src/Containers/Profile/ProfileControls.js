import React from 'react';
import Reflux from 'reflux';
import { Link, withRouter } from 'react-router-dom';
// import { Icon } from 'semantic-ui-react';
import './styles/ProfileControls.css';

// import  from '../../Components/Profile/';

import UserStore, {UserActions} from '../../stores/userStore';
import TranslationStore from '../../stores/translationStore';

import Variable from '../../services/var';
import Http from '../../services/http';

class ProfileControls extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore, TranslationStore];
  }

  render() {
    const t = this.state.tStrings,
          editStateTriggered = Variable.profileEditStateTriggered(this.props.location.pathname),
          editing = this.state.profile.editing.key !== null,
          buttons = [];
    if (!editStateTriggered && !editing) {
      buttons.push(...[(
        <Link
          key="profile-control-edit"
          className="profile-control-link"
          to="/profile/edit"
          onClick={() => {
            Http.log({
              name: "EditProfile",
              page: "Profile",
              action: "Click",
              target: "Initiate"
            });
          }}
        >{t.buttons.edit}</Link>
      ),(
        <span
          key="profile-control-logout"
          className="profile-control-link"
          onClick={() => {
            UserActions.logout();
          }}
        >
          {t.misc.logout}
        </span>
      )]);
    } else if (editStateTriggered && !editing) {
      buttons.push((
        <Link
          key="profile-control-done"
          className="profile-control-link"
          to="/profile"
          onClick={() => {
            Http.log({
              name: "EditProfile",
              page: "Profile",
              action: "Click",
              target: "Terminate"
            });
          }}
        >
          {t.buttons.done}
        </Link>
      ));
    } else if (editing) {
      buttons.push((
        <span
          key="profile-control-save"
          className="profile-control-link"
          onClick={() => {
            UserActions.submitProfileEdit();
          }}
        >
          {t.buttons.save}
        </span>
      ),(
        <span
          key="profile-control-cancel"
          className="profile-control-link"
          onClick={() => {
            UserActions.cancelProfileEdit();
          }}
        >
          {t.buttons.cancel}
        </span>
      ))
    }
    return (
      <div className="flex-row flex-vhCenter profile-control-container">
        {buttons}
      </div>
    );
  }
}

export default withRouter(ProfileControls);
