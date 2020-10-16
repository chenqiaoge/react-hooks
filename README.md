This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

> 基于 create-react-app 搭建 react 全家桶项目（react-router,redux）,ui 库使用 antd-design，封装路由，redux 的 store，hooks 用法

### 初始化

```sh
npx create-react-app react-hooks
cd react-hooks
npm start
```

- add router,redux

```sh
# cnpm install react-router -S
# react-router 是基础库，react-router-dom是搭配react在web端的库
cnpm install react-router-dom -S
cnpm install redux react-redux -S
```

```sh
# 使用npm包的方式配置redux-devtools，也可以用替代方案window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
cnpm install redux-devtools-extension -D
# composeWithDevTools()
```

- 路由封装，类 vue 写法

  - 路由组件拆分，全量引入组件，可切换，done
  - 懒加载组件（react-loadable），路由拦截，done
  - 权限路由，？half
  - 路由搭配面包屑的自动化？half

- 对默认 webpack 自定义配置 -?half--old
  法 1：
  ```sh
  cnpm install customize-cra react-app-rewired -D
  ```
- 对默认 webpack 自定义配置
  法 2：

  ```sh
  cnpm install @craco/craco --save
  ```
  - 添加 craco.config.js 进行 webpack 配置

- 添加 axios，config，请求统一 loading，antd-UI --?

  > 安装 antd4.7.0 新版本（新版本默认支持按需加载，不用 babel-plugin-import）过程中，遇到 hook 报错，不能使用 antdButton 组件的莫名问题，最后发现是由于项目安装多个版本 reac 导致，卸载 node_modules 目录，重新 npm 安装即可；

- store demo 样例

- dnd 拖拽
