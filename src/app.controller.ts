import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 获取所有定时任务
  @Get('tasksList')
  getTasksList() {
    return this.tasksService.getCronJobs();
  }

  // 添加定时任务
  @Post('addTask')
  addTask(@Body() body) {
    return this.tasksService.addCronJob(body.name, body.cronExpression, () => {
      console.log('我在执行定时任务了');
    });
  }

  // 删除定时任务
  @Get('deleteTask')
  deleteTask(@Query() query) {
    return this.tasksService.deleteCronJob(query.name);
  }

  // 暂停定时任务
  @Post('pauseTask')
  pauseTask(@Body() body) {
    return this.tasksService.pauseCronJob(body.name);
  }

  // 恢复定时任务
  @Post('resumeTask')
  resumeTask(@Body() body) {
    return this.tasksService.resumeCronJob(body.name);
  }

  // 更新定时任务
  @Get('updateTask')
  updateTask(@Body() body) {
    return this.tasksService.updateCronJob(body.name, body.cronExpression);
  }
}
