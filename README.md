## 项目简介

本项目使用 `Typescript` + `rollup` + `Koa` 构建的

---

## 快速开始

```bash
yarn # 安装依赖
yarn start # 本地运行
yarn build # 打包生产
```

## 项目结构

```typescript
src // 源码
dist // 编译后文件、首页、静态资源
.editorconfig // VSCode 安装 EditorConfig for VS Code 配合使用
rollup.dev.js // 开发配置
rollup.dist.js // 生产配置
tsconfig.json // ts 配置文件 
```

## 打包生产测试

## 小知识点

1. 更新 npm 包

    ```bash
    yarn upgrade-interactive --lastest # 空格: 选择  i: 反选  a: 全选 会更新 yarn.lock 文件，不会更新package.json文件
    yarn upgrade phaser@lastest # 更新到最新，并更新 package.json 文件
    ```
## 规范

使用 vscode 默认格式化， `cmd` + `,` 进入配置
1. 配置分号规则

    ```bash
    "javascript.format.semicolons": "insert",
    "typescript.format.semicolons": "insert"
    ```

## 计划任务


// 重置生命与分享次数
crontab -e 
1 0 * * * /usr/bin/curl -d "sign=UQyvy3*rAPYt_9vXd" http://127.0.0.1:9001/admin/reset-data
