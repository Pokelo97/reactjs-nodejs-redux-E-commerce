import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute ({component: Component, ...rest}) {
    return (
      <Route {...rest} component={(props)=> 
        (localStorage.getItem('isauthenticated')) ? (
            <Component {...props} />
        ):(
            <Redirect to="/signIn" />
        )
  } />
    )
  }

export default PrivateRoute