import { ResultData } from '@/utils/resultData';
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
      return ResultData.success(jobNames, '定时任务列表');
    } else {
      return ResultData.fail(undefined, '没有定时任务');
    }
  }

  // 添加动态定时任务
  addCronJob(name: string, cronExpression: string, callback: () => void) {
    try {
      const jobList = this.schedulerRegistry.getCronJobs();
      if (jobList.has(name)) {
        return ResultData.fail(400, '定时任务已存在');
      }

      const job = new CronJob(cronExpression, callback, null, true);
      this.schedulerRegistry.addCronJob(name, job);
      job.start();

      return ResultData.success('定时任务添加成功');
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
      return ResultData.fail(400, '定时任务不存在');
    }
    this.logger.log(`Cron job ${name} deleted`);
    this.schedulerRegistry.deleteCronJob(name);
    return ResultData.success('定时任务删除成功');
  }

  // 暂停定时任务
  pauseCronJob(name: string) {
    const list = this.schedulerRegistry.getCronJobs();
    if (list.get(name) === undefined) {
      return ResultData.fail(400, '定时任务不存在');
    }

    const job = this.schedulerRegistry.getCronJob(name);

    if (!job.running) {
      return ResultData.fail(400, '定时任务已暂停');
    }
    job.stop();

    return ResultData.success('定时任务暂停成功');
  }
  // 恢复定时任务
  resumeCronJob(name: string) {
    const list = this.schedulerRegistry.getCronJobs();
    if (list.get(name) === undefined) {
      return ResultData.fail(400, '定时任务不存在');
    }

    const job = this.schedulerRegistry.getCronJob(name);
    if (job.running) {
      return ResultData.fail(400, '定时任务已恢复');
    }

    job.start();
    return ResultData.success(`定时任务 ${name} 恢复成功`);
  }

  // 更新定时任务
  updateCronJob(name: string, cronExpression: string) {
    const list = this.schedulerRegistry.getCronJobs();
    if (list.get(name) === undefined) {
      return ResultData.fail(400, '定时任务不存在');
    }

    const job = this.schedulerRegistry.getCronJob(name);

    job.setTime(new CronTime(cronExpression));
    job.start();
    return ResultData.success('定时任务更新成功');
  }
}
