import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './Profile.css';

import EditText from './EditText';
import EditLocation from './EditLocation';
import EditLanguage from './EditLanguage';

import UserStore, { UserActions } from '../../stores/userStore';
import TranslationStore from '../../stores/translationStore';

import Variable from '../../services/var';

// import { userIconTextObjects } from '../../stores/data/profile';

class ProfileIconText extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [UserStore, TranslationStore];
  }

  initiateEdit() {
    const context = this.props.context;
    const editData = (
      context.getInitialEditValue?
        context.getInitialEditValue(this.state.user[context.key]) :
        this.state.user[context.key] || ""
    );
    UserActions.editProfileItem(editData, context.key);
  }

  renderDetail() {
    const context = this.props.context,
          editStateTriggered = Variable.profileEditStateTriggered(this.props.location.pathname),
          t = this.state.tStrings,
          canInitiateEdit = !!editStateTriggered && this.state.profile.editing.key === null;

    let textClassName = editStateTriggered && !this.state.profile.editing.key ? "editable-text" : "";
    if (context.elementClassName) textClassName += " " + context.elementClassName;

    let text = t.profile.notGiven;
    const userInfo = this.state.user[context.key];
    if (!!context.getValue) text = context.getValue(userInfo, editStateTriggered);
    else if ( !!userInfo && userInfo !== null && !!userInfo.toString()) {
      text = userInfo;
    }

    let props = {
      className: textClassName,
      onClick: canInitiateEdit ? () => { this.initiateEdit(); } : null
    };

    return (
      React.createElement(
        context.element || 'span',
        props,
        text
      )
    )
  }

  renderEdit() {
    const context = this.props.context;
    switch (context.editType) {
      case "Lang":
        return <EditLanguage />;
      case "Location":
        return <EditLocation />;
      default:
        return (<EditText context={context}/>);
    }
  }

  render() {
    const context = this.props.context,
          editStateTriggered = Variable.profileEditStateTriggered(this.props.location.pathname),
          editing = editStateTriggered && this.state.profile.editing.key === context.key;

    return (
      <div className="flex-row flex-vStart flex-noWrap icon-detail">
        {
          !context.iconName ? null :
            <div className="icon">
              <Icon name={context.iconName} />
            </div>
        }
        <div className="detail">
          {
            !editing ?
              this.renderDetail()
              :
              this.renderEdit()
          }
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileIconText);
