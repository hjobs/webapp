import Reflux from 'reflux';

import Http from '../services/http';

export const MiscActions = Reflux.createActions([
  'enableDeveloper'
]);

class MiscStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      isDeveloper: !!localStorage.getItem("developer")
    };
    this.listenables = MiscActions;
  }

  enableDeveloper() {
    console.log("enableDeveloper called");
    if (!this.state.isDeveloper) {
      localStorage.setItem("developer", "true");
      Http.log({name: "EnableDeveloper", page: "Home", action: "Click", component: "HeroBanner"});
      this.setState(s => {
        s.isDeveloper = true;
      })
    }
  }
}

export default MiscStore;
