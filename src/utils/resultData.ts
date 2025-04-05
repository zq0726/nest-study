import { HttpStatus } from '@nestjs/common';

export class ResultData {
  constructor(
    public code = HttpStatus.OK,
    public message?: string,
    public data?: any,
    public status?: 'success' | 'error',
    public timestamp?: string,
  ) {
    this.code = code;
    this.message = message || '操作成功';
    this.data = data || null;
    this.status = status || 'success';
    this.timestamp = timestamp || new Date().toISOString();
  }

  static success(
    data?: any,
    message?: string,
    status: 'success' | 'error' = 'success',
  ) {
    return new ResultData(
      HttpStatus.OK,
      message,
      data,
      status,
      new Date().toISOString(),
    );
  }

  static fail(
    code: number = HttpStatus.BAD_REQUEST,
    message?: string,
    data?: any,
    status: 'success' | 'error' = 'error',
  ) {
    return new ResultData(
      code,
      message,
      data,
      status,
      new Date().toISOString(),
    );
  }
}
