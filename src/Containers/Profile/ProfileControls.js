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
    const editing = this.state.profile.editing.key !== null;
    if (!!editing) return null;
    const t = this.state.tStrings,
          buttons = [];

    if (!editing) {
      buttons.push((
        <span
          key="profile-control-logout"
          className="profile-control-link"
          onClick={() => {
            UserActions.logout();
          }}
        >
          {t.misc.logout}
        </span>
      ));
    }
    return (
      <div className="flex-row flex-vhCenter profile-control-container">
        {buttons}
      </div>
    );
  }
}

export default withRouter(ProfileControls);
