import Reflux from 'reflux';

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
        this.setState(s => {
          s.ad.array = d;
          s.ad.current = d[0];
          s.ad.timer = this.adTimer(d, d[0]);
          return s;
        });
      }
    });
  }

  adTimer(adArr, adCurr) {
    return window.setTimeout(() => {
      const currIndex = Variable.indexOfDataInArray(adCurr, adArr);
      const nextIndex = currIndex < (adArr.length - 1) ? currIndex + 1 : 0;
      this.setState({
        ad: {
          current: adArr[nextIndex],
          timer: this.adTimer(adArr, adArr[nextIndex]),
          array: this.state.ad.array
        }
      });
    }, 10000);
  }

}

export default AdStore;
