import React from 'react';

const Location = ({job}) => {
  if (!job.locations || job.locations.length <= 0) return null;

  return (
    <span>
      <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
      {job.locations.map(l => l.city || l.address).join(", ")}<br />
    </span>
  );
}

export default Location;
