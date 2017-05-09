import React from 'react';
// import Reflux from 'reflux';
// import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import './styles/LoginButtons.css';

// import UserStore from '../../stores/userStore';
import Linkedin from './linkedin.png';
import Google from './google.png';
import Facebook from './facebook.png';

// import Variable from '../../services/var';
import Http from '../../services/http';

const buttonObjects = [
  {
    key: "linkedin",
    src: Linkedin
  },
  {
    key: 'google',
    src: Google
  },
  {
    key: 'facebook',
    src: Facebook
  }
];

class LoginButtons extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.store = UserStore;
  // }

  render() {
    return (
      <div className="flex-col flex-vhCenter outter-div">
        {
          buttonObjects.map(obj => (
            <div
              key={"sign-via-" + obj.key + "-button-container"}
              className="social-button-container"
            >
              <a target="_self" href={Http.baseUrl + 'auth/' + obj.key}>
                <Image src={obj.src} alt={obj.key + " signin"} />
              </a>
            </div>
          ))
        }
      </div>
    );
  }
}

export default LoginButtons;
