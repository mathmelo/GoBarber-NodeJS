import Bee from 'bee-queue';

import CancellationMail from '../app/jobs/CancellationMail';

import redisConfig from '../config/redis';

// =============================================================================

const jobs = [CancellationMail];

/**
 * This class will control the queue of e-mails to be sent to the providers
 * in the case cancellation of appointment
 */

class Queue {
  constructor() {
    // All background job queues

    this.queues = {};

    this.init();
  }

  /**
   * This method goes through all files in the 'jobs path' (./src/app/jobs) and:
   *  --> Obtains its keys and handle functions.
   *  --> Create a queue for each job
   *
   * OBS:
   *  All jobs will be saved to the 'this.queue' object.
   */

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * This method will add a new job to the queue
   *
   * OBS:
   *  The queue has one or more jobs, so you must specify which queue
   *  you want to add the job
   */

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * This method will go through all the jobs and call the handle method
   */

  processQueue() {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handlefailure).process(handle);
    });
  }

  handlefailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
