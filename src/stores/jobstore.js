import Reflux from 'reflux';

const JobActions = Reflux.createAction([
  'getJobs'
]);

class JobStores extends Reflux.Store {
  constructor() {
    super();
    this.listenables = JobActions;
  }

  getJobs() {
  }
}

export default JobStores;
