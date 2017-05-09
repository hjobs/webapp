import React from 'react';
import Reflux from 'reflux';
import { Redirect } from 'react-router-dom';
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
    // this.state = {
    //   modal: this.getModalInitialState()
    // };
    this.store = UserStore;
  }

  render() {
    if (!this.state.authToken) return <Redirect to="/jobs/stable" />;
    return (
      <div className="flex-col flex-vCenter profile-page-container">
        <ProfileContent />
        <ProfileControls />
      </div>
    );
  }
}

export default ProfilePage;
