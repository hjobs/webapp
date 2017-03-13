import React from 'react';

import TrafficLight from './TrafficLight';
import Variable from '../../services/var';
const vars = new Variable();

// class Description extends React.Component {
//   render() {
//     return (
//     );
//   }
// }

const Description = () => (
  <div className="full-width flex-row flex-vhCenter" style={{margin: "10px auto", opacity: "0.8"}}>
    {
      vars.urgencyTypes.map(item => (
        <div style={{display: "inline-block", marginLeft: "8px", marginRight: "8px", fontSize: "14px"}} key={item.className}>
          <TrafficLight colorClass={item.className} />
          {item.name}
        </div>
      ))
    }
  </div>
);

export default Description;
