// import Bee from 'bee-queue';

// Jobs
// import CancellationMail from '../app/jobs/CancellationMail';

// =============================================================================

/**
 * This class will control the queue of emails to be sent to providers
 */

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {}
}

export default new Queue();
