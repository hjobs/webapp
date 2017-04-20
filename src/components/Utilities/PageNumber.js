/** @typedef {{current: number, total: number, loadedTo: number}} Page */

import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router-dom';
// import Variable from '../../services/var';
// import Http from '../../services/http';

class PageNumber extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { location } = this.props;
    /** @type {Page} */
    const page = this.props.page;
    if (page.total === 1) return null;
    const pageArr = [];
    for (let i = 1; i <= page.total; i++) {
      let pageClassName = "page-number link";
      if (i === page.current) pageClassName += " active";
      pageArr.push(
        <Link
          key={"page_number_" + i}
          className={pageClassName}
          to="">
          {i}
        </Link>
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

export default PageNumber;
