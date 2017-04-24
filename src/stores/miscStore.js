import Reflux from 'reflux';

import Http from '../services/http';

const MiscActions = Reflux.createActions([
  'enableDeveloper'
]);

class MiscStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      isDeveloper: this.isDeveloper()
    };
    this.listenables = MiscActions;
  }

  enableDeveloper() {
    console.log("enableDeveloper called");
    if (!this.state.isDeveloper) {
      this.state.isDeveloper = true;
      localStorage.setItem("developer", "true");
      Http.log({name: "EnableDeveloper", page: "Home", action: "Click", component: "HeroBanner"});
    }
  }
  isDeveloper() { return localStorage.getItem("developer") === "true"; }
}

export default MiscStore;
