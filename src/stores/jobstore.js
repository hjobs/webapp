import Reflux from 'reflux';

export const JobActions = Reflux.createActions([
  'getJobs'
]);

class JobStore extends Reflux.Store {
  constructor() {
    super();
    this.listenables = JobActions;
  }

  getJobs() {
  }
}

export default JobStore;
