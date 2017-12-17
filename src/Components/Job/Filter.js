import React from 'react';
import Reflux from 'reflux';
import { withRouter } from 'react-router-dom';
const queryString = require('query-string');

import TranslationStore from '../../stores/translationStore';
import JobStore from '../../stores/jobStore';
import { jobTags, jobTagTranslations } from '../../stores/data/jobTags';
import { generateNewLocation } from '../../services/http';
import { queryStringOption } from '../../services/var';

const tStrings = {
  "en": {
    filterShow: "Show filter",
    filterHide: "Hide filter"
  },
  "zh-HK": {
    filterShow: "顯示進階搜尋",
    filterHide: "隱藏進階搜尋"
  }
};

class Filter extends Reflux.Component {
  constructor(props) {
    super(props);
    const queryObj = queryString.parse(props.location.search, queryStringOption),
          noFilter = !queryObj.filter || queryObj.filter.length <= 0;
    this.state = {filterShown: !noFilter};
    this.stores = [JobStore, TranslationStore];
    this.storeKeys = ["locale"];
  }

  handleChange(group, code) {
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
    if (!!queryObj.page) delete queryObj.page;
    history.push(generateNewLocation(location, {search: "?" + queryString.stringify(queryObj, queryStringOption)}));
  }

  render() {
    const locale = this.state.locale || "en",
          filters = queryString.parse(this.props.location.search, queryStringOption).filter || [],
          filterShown = this.state.filterShown,
          t = tStrings[locale];
    // console.log(["filters = ",filters]);
    return (
      <div className="flex-col flex-vhCenter" style={this.props.style}>
        <div
          className="link"
          onClick={() => { this.setState(s => { s.filterShown = !filterShown }) }}
        >
          {filterShown ? t.filterHide : t.filterShow}
        </div>
        <div style={{display: filterShown ? "block" : "none"}}>
          {
            jobTags.map((tagGroup) => (
              <div
                key={'tagGroup_' + tagGroup.group}
                className="flex-row flex-vCenter"
                style={{flexWrap: "nowrap", padding: "7px 0px"}}
              >
                <div style={{padding: "0px 7px"}}>
                  <label>{jobTagTranslations.group[tagGroup.group][locale]}:</label>{' '}
                </div>
                <div
                  className="flex-row flex-vCenter"
                  style={{flexWrap: "wrap", padding: "0px 3px"}}>
                {
                  tagGroup.codes.map((codeObj) => (
                    <div
                      key={'tag_' + codeObj.code}
                      style={{padding: "0px 5px"}}
                    >
                      <input
                        type="checkbox"
                        checked={(filters.indexOf(codeObj.code) !== -1)}
                        onClick={() => this.handleChange(tagGroup.group, codeObj.code)}
                      />
                      {' ' + jobTagTranslations.code[codeObj.code][locale]}
                    </div>
                  ))
                }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Filter);
