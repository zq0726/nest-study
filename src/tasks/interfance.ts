export interface TaskConfig {
  name: string; // 任务唯一标识
  cron: string; // Cron 表达式（如 "*/5 * * * * *"）
  task: () => Promise<void> | void; // 直接传递任务函数
}
