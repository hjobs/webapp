import React from 'react';

const ErrorDiv = ({error}) => {
  return (
    <div className="flex-row flex-vhCenter" style={{minHeight: "200px", padding: "20px"}}>
      {
        !!error ?
          error
          :
          "We encountered a server error. Please check you have connected to the internet or report to us through info@hjobs.hk :)"
      }
    </div>
  );
}

export default ErrorDiv;
