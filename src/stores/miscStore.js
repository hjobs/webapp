import Reflux from 'reflux';

import { log } from '../services/http';

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
      log({name: "EnableDeveloper", page: "Home", action: "Click", component: "HeroBanner"});
      localStorage.setItem("developer", "true");
      const nextState = this.state;
      nextState.isDeveloper = true;
      this.setState(nextState);
    }
  }
}

export default MiscStore;
