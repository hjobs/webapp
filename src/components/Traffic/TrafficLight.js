import React from 'react';
// import { Grid, Row, Col } from 'react-bootstrap';

import Variable from '../../services/var';

class TrafficLight extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  render() {
    if (this.props.show === false || (!this.props.colorClass && !this.props.job)) return null;
    const colorClass = !!this.props.colorClass ? this.props.colorClass : this.vars.getColorClass(this.props.job);
    if (!colorClass) return null;

    return <div className={"traffic " + colorClass} />;
  }
}

TrafficLight.propTypes = {
  show: React.PropTypes.bool,
  colorClass: React.PropTypes.any,
  job: React.PropTypes.any
};

export default TrafficLight;
