import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob, CronTime } from 'cron';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}
  // 获取所有定时任务
  getCronJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const jobNames = Array.from(jobs.keys());
    if (jobNames.length > 0) {
      return {
        code: 200,
        message: '定时任务列表',
        data: jobNames,
      };
    } else {
      return {
        code: 200,
        message: '没有定时任务',
        data: [],
      };
    }
  }

  // 添加动态定时任务
  addCronJob(name: string, cronExpression: string, callback: () => void) {
    try {
      const jobList = this.schedulerRegistry.getCronJobs();
      if (jobList.has(name)) {
        return {
          code: 400,
          message: '定时任务已存在',
        };
      }

      const job = new CronJob(cronExpression, callback, null, true);
      this.schedulerRegistry.addCronJob(name, job);
      job.start();

      return {
        code: 200,
        message: '定时任务添加成功',
      };
    } catch (error) {}
  }

  // 删除定时任务
  deleteCronJob(name: string) {
    console.log('name', name);
    const list = this.schedulerRegistry.getCronJobs();
    console.log('list', list);
    const job = list.get(name);
    console.log('job', job);
    if (!job) {
      return {
        code: 400,
        message: '定时任务不存在',
      };
    }
    this.logger.log(`Cron job ${name} deleted`);
    this.schedulerRegistry.deleteCronJob(name);
    return {
      code: 200,
      message: '定时任务删除成功',
    };
  }

  // 暂停定时任务
  pauseCronJob(name: string) {
    const list = this.schedulerRegistry.getCronJobs();
    if (list.get(name) === undefined) {
      return {
        code: 400,
        message: `${name} job does not exist`,
      };
    }

    const job = this.schedulerRegistry.getCronJob(name);

    if (!job.running) {
      return {
        code: 400,
        message: `${name} job is already paused`,
      };
    }
    job.stop();
    this.logger.log(`Cron job ${name} paused`);
    return {
      code: 200,
      message: `Cron job ${name} paused`,
    };
  }
  // 恢复定时任务
  resumeCronJob(name: string) {
    const list = this.schedulerRegistry.getCronJobs();
    if (list.get(name) === undefined) {
      return {
        code: 400,
        message: `${name} job does not exist`,
      };
    }

    const job = this.schedulerRegistry.getCronJob(name);
    if (job.running) {
      return {
        code: 400,
        message: `${name} job is already running`,
      };
    }
    this.logger.log(`Cron job ${name} resumed`);

    job.start();
    return {
      code: 200,
      message: `Cron job ${name} resumed`,
    };
  }

  // 更新定时任务
  updateCronJob(name: string, cronExpression: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    if (job) {
      job.setTime(new CronTime(cronExpression));
      job.start();
      this.logger.log(
        `Cron job ${name} updated with new expression: ${cronExpression}`,
      );
    } else {
      this.logger.warn(`Cron job ${name} not found`);
    }
  }
}
