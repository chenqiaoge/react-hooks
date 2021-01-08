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
# redux 持久化
cnpm install redux-persist -S

```

```js
// ----reducers/index.js--------
import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import loading from './loading'
import demo from './demo'

const rootReducer = combineReducers({
  demo,
  loading,
})
export default rootReducer
// ---reducers/demo.js
import * as types from '@/store/action-types'
const initialState = {
  count: 10,
}
// state仓库的值, action是传递的状态
export default function (state = initialState, action) {
  console.log('---reducer:', action, state)
  // if (action.type === 'persist/REHYDRATE') return state
  switch (action.type) {
    case types.ADD_COUNT: {
      return {
        ...state,
        count: action.payload.count,
      }
    }

    default: {
      return state
    }
  }
}
// --actions/demo.js
import * as types from '@/store/action-types'

let nextTodoId = 1
export const handleAddCount = (content) => {
  console.log(content)
  return {
    type: types.ADD_COUNT,
    payload: {
      id: ++nextTodoId,
      count: content,
    },
  }
}
// store/index.js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/index' // reducer模块化组合

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['loading', 'demo'], // 需要持久化的reducer
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export let persistor = persistStore(store)
export default store

// 入口文件index.js：（PersistGate,persistor）
import store, { persistor } from '@store'
import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

- 组件中使用 store：三种方式

1. 直接引入 store：

```js
import store from '@/store'；
console.log(store, store.getState(),store.dispatch())
```

2. connect 方式：

```js
function Home(props) {
  console.log(props.count)
  props.handleAddCount(num)
}
const mapStateToProps = (state) => ({ count: state.demo.count })
const mapDispatchToProps = (dispatch) => {
  return {
    handleAddCount: (val) => dispatch(handleAddCount(val)),
  }
}
//  法二：connect 方式使用store
export default connect(mapStateToProps, mapDispatchToProps)(Home)
```

3. hook 的 use 方法

```js
import React, { useState, useCallback } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { handleAddCount } from '@/store/actions/demo'

function StoreCount(props) {
  // console.log(props)
  const [pageState] = useState(1)
  // 获取store中state
  const hookCount = useSelector((state) => state.demo.count, shallowEqual)
  // console.log('hookState', hookCount)
  // store 的 dispatch
  const dispatch = useDispatch()
  const history = useHistory()
  const addCount = useCallback(() => {
    const num = hookCount + 1
    // console.log(num, props)
    dispatch(handleAddCount(num))
  }, [dispatch, hookCount])
  const handleGoLogin = useCallback(() => {
    history.push('/login')
  }, [history])
  return (
    <div className='Home'>
      <div className='cont'>
        pageState:{pageState},hookcount:{hookCount}
      </div>
      <span className='testJsx'>文件名jsx有提示</span>
      <button onClick={addCount}>add</button>
      <button onClick={handleGoLogin}>login</button>
    </div>
  )
}

// 法三：hooks 方式使用store
export default StoreCount
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
