import Reflux from 'reflux';
import clone from 'clone';

import Variable from '../services/var';
import Http from '../services/http';

export const AdActions = Reflux.createActions([
  "loadAds"
]);

class AdStore extends Reflux.Store {
  constructor() {
    super();
    this.state = this.getInitialState();
    this.listenables = AdActions;
    this.loadAds();
  }

  componentDidMount() { this.loadAds(); }

  getInitialState() {
    return {
      ad: {
        array: null,
        current: null,
        timer: null
      }
    };
  }

  loadAds() {
    Http.request("ads").then(res => res.json()).then(d => {
      console.log(["got ads", d]);
      if (!!d && d.length > 0) {
        const nextState = clone(this.state);
        nextState.ad.array = d;
        nextState.ad.current = d[0];
        nextState.ad.timer = this.adTimer(d, d[0])
        this.setState(nextState);
      }
    });
  }

  adTimer(adArr, adCurr) {
    return window.setTimeout(() => {
      const currIndex = Variable.indexOfDataInArray(adCurr, adArr),
            nextIndex = currIndex < (adArr.length - 1) ? currIndex + 1 : 0,
            nextState = clone(this.state);
      nextState.ad.current = adArr[nextIndex];
      nextState.ad.timer = this.adTimer(adArr, adArr[nextIndex])
      this.setState(nextState);
    }, 10000);
  }

}

export default AdStore;
