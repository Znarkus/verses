'use strict'

import React, { Fragment } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Output from './views/Output'
import App from './views/App'

render(
  <Router>
    <Fragment>
      <Route exact path="/" component={App}/>
      <Route path="/output" component={Output}/>
    </Fragment>
  </Router>,
  document.getElementById('mount')
)
