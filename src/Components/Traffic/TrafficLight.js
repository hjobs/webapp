import React from 'react';
import Reflux from 'reflux';
// import { Grid, Row, Col } from 'react-bootstrap';
import "./styles/Traffic.css";

import Variable from '../../services/var';

class TrafficLight extends Reflux.Component {
  render() {
    let colorClass;
    if (!!this.props.colorClass) colorClass = this.props.colorClass;
    else {
      if (this.props.show === false) return null
      if (!this.props.job) return null;
      colorClass = Variable.getColorClass(this.props.job);
    }
    if (!colorClass) return null;

    return <div className={"traffic " + colorClass} />;
  }
}

// TrafficLight.propTypes = {
//   show: React.PropTypes.bool,
//   colorClass: React.PropTypes.any,
//   job: React.PropTypes.any
// };

export default TrafficLight;
