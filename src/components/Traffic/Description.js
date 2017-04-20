import React from 'react';
import Reflux from 'reflux';

import TrafficLight from './TrafficLight';
import Variable from '../../services/var';

import TranslationStore from '../../stores/translationStore';

class Description extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = TranslationStore;
  }

  render() {
    return (
      <div className="full-width flex-row flex-vhCenter" style={{margin: "10px auto", opacity: "0.8"}}>
        {
          Variable.urgencyTypes.map(item => (
            <div style={{display: "inline-block", marginLeft: "8px", marginRight: "8px", fontSize: "14px"}} key={item.className}>
              <TrafficLight colorClass={item.className} />
              {this.state.tStrings.urgencies[item.value]}
            </div>
          ))
        }
      </div>
    );
  }
}

Description.propTypes = {
  t: React.PropTypes.any.isRequired
};

export default Description;
