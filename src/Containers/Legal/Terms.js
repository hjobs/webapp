import React from 'react';
import Reflux from 'reflux';

import TranslationStore from '../../stores/translationStore';

class Terms extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = TranslationStore;
  }

  render() {
    const t = this.state.tStrings;
    return (
      <section className="flex-col flex-vhCenter terms-page-container">
        {t.profile.notGiven}
      </section>
    );
  }
}

export default Terms;
