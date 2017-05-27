import React from 'react';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import './styles/ProfilePage.css';

import ProfileContent from './ProfileContent';
import ProfileControls from './ProfileControls';

// import  from '../../Components/Profile/';

import UserStore from '../../stores/userStore';

// import Variable from '../../services/var';
// import Http from '../../services/http';

class ProfilePage extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = UserStore;
    this.storeKeys = ["authToken", "profile"];
  }

  render() {
    if (!this.state.authToken) return <Redirect to="/jobs/stable" />;
    return (
      <div className="flex-col flex-vCenter profile-page-container">
        <ProfileContent />
        <ProfileControls />
        <Dimmer active={this.state.profile.loading} page children={<Loader />} />
      </div>
    );
  }
}

export default ProfilePage;
