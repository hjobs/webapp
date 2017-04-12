/** @typedef {{current: number, total: number, loadedTo: number}} Page */

import React from 'react';
// import Variable from '../../services/var';
// import Http from '../../services/http';

class PageNumber extends React.Component {
  // constructor(props) {
    // super(props);
    // this.state = {};
    // this.vars = new Variable();
    // this.http = new Http();
  // }

  render() {
    /** @type {Page} */
    const page = this.props.page;
    if (page.total === 1) return null;
    
    const pageArr = [];
    for (let i = 1; i <= page.total; i++) {
      let pageClassName = "page-number link";
      if (i === page.current) pageClassName += " active";
      pageArr.push(
        <span
          key={"page_number_" + i}
          className={pageClassName}
          onClick={() => { this.props.goToPage(i); }}>
          {i}
        </span>
      );
      // if (i !== page.total) {
      //   pageArr.push(<span key={"page_number_separator_" + i}>|</span>);
      // }
    }

    return (
      <div className="text-center page-number-container">
        {pageArr}
      </div>
    );
  }
}

PageNumber.propTypes = {
  page: React.PropTypes.object.isRequired,
  goToPage: React.PropTypes.func.isRequired
};

export default PageNumber;