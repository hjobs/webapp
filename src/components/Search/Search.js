import React from 'react';
import 'whatwg-fetch';
// import Autosuggest from 'react-autosuggest';
// import { Row, Col } from 'react-bootstrap';

import Variable from '../../var';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.vars = new Variable();
  }

  openModal(job) { this.setState(s => { s.modalShown = true; s.applyModalData = job; return s; }); }
  closeModal() { this.setState(s => { s.modalShown = false; return s; }); }
  /** @param {'quick'|'stable'|'internship'|'project'} str */
  changeViewType(str) {
    if (str !== this.props.viewType) {
      this.props.changeViewType(str);
    }
  }

  render() {
    // const backgroundColor = {backgroundColor: "#FFFFFF"};

    return (
      <div className="search">
        <div className="search-view-type text-center">
          I am looking for {
            this.vars.viewTypes.map(v => (
              <span
                key={'search-view-type-' + v.value}
                className={this.props.viewType === v.value ? 'link active' : 'link inactive'}
                onClick={() => { this.changeViewType(v.value); }}>
                {v.name}
              </span>
            ))
          }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  viewType: React.PropTypes.string,
  changeViewType: React.PropTypes.func.isRequired
};

export default Search;

// <Job imgSrc={data[i].imgSrc} title={data[i].title} name={data[i].name} date={data[i].date} applyJob={this.applyJob.bind((data[i]))} key={i} />
//

        // <div className="col-sm-12 col-md-6" >
        //   <Job imgSrc={data[i + 1].imgSrc} title={data[i + 1].title} name={data[i + 1].name} date={data[i + 1].date} applyJob={this.applyJob.bind((data[i + 1]))} key={i + 1} />
        // </div>
