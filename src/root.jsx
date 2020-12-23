import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from '@/views/login'
import App from '@/components/common/layout'

function Root(props) {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <PrivateRoute component={App}></PrivateRoute>
      </Switch>
    </Router>
  )
}
const ifLogin = true
function PrivateRoute(props) {
  const Component = props.component
  return (
    <Route
      render={() => {
        return ifLogin ? <Component /> : <Redirect to='/login' />
      }}
    />
  )
}

export default Root
