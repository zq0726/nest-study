# nest-study
nest 学习

## 目录结构
my-nest-project/
> ── node_modules/            # 项目依赖包
>── src/                     # 项目开发目录
>   >── main.ts              # 应用程序的入口文件
>   >── app.module.ts        # 根模块，告诉 Nest 如何组装应用
>   >── app.controller.ts    # 根控制器
>   >── app.service.ts       # 根服务
>   >── common/              # 通用模块，包含自定义装饰器、过滤器、守卫、拦截器、中间件等
>   >   >── decorators/      # 自定义装饰器
>   >   >── filters/         # 异常过滤器
>   >   >── guards/          # 守卫
>   >   >── interceptors/    # 拦截器
>   >   >── middleware/      # 中间件
>   >── config/              # 配置相关
>   >   >── app.config.ts    # 应用基础配置
>   >   >── env/             # 环境配置校验
>   >── modules/             # 业务代码，按目录区分模块
>   >   >── a/               # 模块 A
>   >   >   >── a.controller.ts
>   >   >   >── a.module.ts
>   >   >   >── a.service.ts
>   >   >── b/               # 模块 B
>   >   >   >── b.controller.ts
>   >   >   >── b.module.ts
>   >   >   >── b.service.ts
>   >   >── ...              # 其他模块
>   >── tasks/               # 定时任务
>   >   >── tasks.module.ts
>   >   >── tasks.service.ts
>── public/                  # 静态资源目录（如图片、字体等）
>── uploads/                 # 文件上传存储目录
>── .env                     # 本地环境变量
>── .env.prod                # 生产环境变量
>── nest-cli.json            # Nest CLI 配置文件
>── package.json             # 项目依赖和脚本配置文件
>── package-lock.json        # 锁定项目依赖包的版本
>── renovate.json            # Renovate 配置文件（用于自动更新依赖包）
>── README.md                # 项目说明文件
>── tsconfig.json            # TypeScript 配置文件
>── ...                      # 其他项目文件
