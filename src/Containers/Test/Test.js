import React from "react";
import Reflux from 'reflux';

class Test extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <div>
        <p>shit</p>
      </div>
    );
  }
}

export default Test;
