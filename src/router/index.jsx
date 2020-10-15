import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory, useLocation } from 'react-router-dom'
// import routes from './routeConfig'

// 每个路由都在这里create，可以在钩子中做拦截
// export default function WrapRouter(props) {
//   console.log(props)
//   function changeBread() {
//     console.log('change store bread')
//   }
//   let location = useLocation()
//   useEffect(() => {
//     console.log('effect route Update', location.pathname)
//     changeBread()
//   }, [location.pathname])

//   // const Component = props.component
//   // const route = <Route {...rest} render={() => <Component /> />
//   const { ...rest } = props
//   const route = <Route {...rest} />
//   return (
//     <Switch>
//       {route}
//       {/* <Route path="/" component={App}> */}
//       {/* <Route path='/' exact component={Home} /> */}
//       {/* <Route path='/about' component={About} /> */}
//       {/* <Route path='/inbox' component={Inbox} /> */}
//       {/* </Route> */}
//     </Switch>
//   )
// }
// 优化的wrapRoute,筛选后的routeList生成route组件
export default function WrapRouter(props) {
  // console.log(props)
  const { routeList } = props
  let location = useLocation()
  let history = useHistory()
  const createdRoute = routeList.map((item, index) => {
    return <Route key={index} {...item} />
  })
  function changeBread(location) {
    // 路由变化，changeBread
    console.log('change store bread')
    // 路由拦截
    if (location.pathname === '/inbox') {
      console.log('拦截了')
      // history.push('/')
    }
  }
  useEffect(() => {
    console.log('effect route Update', location.pathname)
    changeBread(location)
  }, [location.pathname])

  return (
    <Switch>
      {createdRoute}
      {/* <Route path="/" component={App}> */}
      {/* <Route path='/' exact component={Home} /> */}
      {/* <Route path='/about' component={About} /> */}
      {/* <Route path='/inbox' component={Inbox} /> */}
      {/* </Route> */}
    </Switch>
  )
}
