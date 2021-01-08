import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import store, { persistor } from '@store'
import { PersistGate } from 'redux-persist/integration/react'

import '@/assets/style/theme.less'
import Root from './root';
import * as serviceWorker from './serviceWorker';
import { messageTip } from '@utils/index.js'


React.$messageTip = messageTip  // 给React挂载message，方便组件调用

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
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
