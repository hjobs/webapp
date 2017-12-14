import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';
const queryString = require('query-string');

import TranslationStore from '../../stores/translationStore';
import JobStore from '../../stores/jobStore';
import { jobTags, jobTagTranslations } from '../../stores/data/jobTags';
import { generateNewLocation } from '../../services/http';
import { queryStringOption } from '../../services/var';

// const tStrings = {
//   "en": {
//     shareIn: "Share in",
//     or: "or",
//     copyToClipboard: "copy link",
//     copied: "Copied!"
//   },
//   "zh-HK": {
//     shareIn: "分享",
//     or: "或",
//     copyToClipboard: "複製連結",
//     copied: "已複製!"
//   }
// }

class Filter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.stores = [JobStore, TranslationStore];
    this.storeKeys = ["locale"];
  }

  handleChange(type, code) {
    const queryObj = queryString.parse(this.props.location.search, queryStringOption),
          { history, location } = this.props;
    if (!queryObj.filter || queryObj.filter.length <= 0) {
      queryObj.filter = [];
    }
    console.log(["queryObj.filter = ", queryObj.filter]);
    const filterIsInQuery = (
      queryObj.filter.length > 0 &&
      queryObj.filter.indexOf(code) !== -1
    );
    if (filterIsInQuery) {
      queryObj.filter.splice(queryObj.filter.indexOf(code), 1);
      if (queryObj.filter.length <= 0) delete queryObj.filter
    } else {
      queryObj.filter.push(code);
    }
    history.push(generateNewLocation(location, {search: "?" + queryString.stringify(queryObj, queryStringOption)}));
  }

  render() {
    const locale = this.state.locale || "en";
    const filters = queryString.parse(this.props.location.search, queryStringOption).filter || [];
    // console.log(["filters = ",filters]);
    return (
      <div className="flex-col flex-vhCenter" style={this.props.style}>
        <div>
          {
            jobTags.map((tagGroup) => (
              <div key={'tagGroup_' + tagGroup.type}>
                <label>{jobTagTranslations.type[tagGroup.type][locale]}:</label>{' '}
                {
                  tagGroup.codes.map((code) => (
                    <span key={'tag_' + code} style={{padding: "0px 5px"}}>
                      <input
                        type="checkbox"
                        checked={(filters.indexOf(code) !== -1)}
                        onClick={() => this.handleChange(tagGroup.type, code)}
                      />
                      {jobTagTranslations.code[code][locale]}
                    </span>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Filter);
