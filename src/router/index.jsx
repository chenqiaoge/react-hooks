import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import routes from './routeConfig'

export default function WrapRouter(props) {
  console.log(props, routes)
  const route = routes.map((item) => {
    // console.log(item)
    const Component = item.component
    return (
      <Route path={item.path} exact={item.exact} key={item.path} render={() => <Component />} />
    )
  })
  return (
    <Switch>
      {route}
      {/* <Route path="/" component={App}> */}
      {/* <Route path='/' exact component={Home} /> */}
      {/* <Route path='/about' component={About} /> */}
      {/* <Route path='/inbox' component={Inbox} /> */}
      {/* </Route> */}
    </Switch>
  )
}
