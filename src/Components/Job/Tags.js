import React from 'react';
import Reflux from 'reflux';
import './styles/Tags.css';

import { getTStrings } from '../../services/var';
import { jobTagTranslations } from '../../stores/data/jobTags';
import TranslationStore from '../../stores/translationStore';

const Tag = (props) => (
  <div className={"flex-row flex-vhCenter tag"}>
    <div className={props.type}>{props.string}</div>
  </div>
);

class Tags extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = TranslationStore;
    this.storeKeys = ["locale"];
  }

  render() {
    const t = getTStrings(),
          tags = [],
          locale = this.state.locale,
          job = this.props.job

    if (job.event) {
      tags.push(
        <Tag
          string={job.event}
          type="event"
          key={job.id + "-event-" + job.event}
        />
      );
    }
    if (job.langs && job.langs.length > 0) {
      job.langs.forEach(lang => {
        tags.push(
          <Tag
            string={t.misc.languages[lang.code]}
            type="lang"
            key={job.id + "-langs-" + lang.name}
          />
        );
      });
    }
    if (!!job.date_tags && job.date_tags.length > 0) {
      job.date_tags.forEach(dateTagStr => {
        tags.push(
          <Tag
            key={job.id + "-datetag-" + dateTagStr}
            string={dateTagStr}
            type="date"
          />
        );
      });
    }

    if (!!job.tags && job.tags.length > 0) {
      job.tags.forEach(t => {
        tags.push(
          <Tag
            key={job.id + "-job_tag-" + t.code}
            string={jobTagTranslations.code[t.code][locale]}
            type="job_tag"
          />
        );
      });
    }

    return !!tags && tags.length > 0 ?
    (
      <div className="flex-row flex-hStart flex-vCenter tags-container">
        {tags}
      </div>
    ) :
    (
      <div className="full-width" style={{height: '5px'}} />
    );
  }
}

export default Tags;
