import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Buy } from './components/Buy';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
  state = {
    isAuthenticated: false
  }

  render () {
    const authenticatedRoutes = (
      <Fragment>
        <Route path ='/my-profile' />
        <Route path='/sign-out' />
      </Fragment>
    )
    const unauthenticatedRoutes = (
      <Fragment>
        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUp} />
      </Fragment>
    )
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        {this.state.isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/buy' component={Buy} />
        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUp} />
      </Layout>
    );
  }
}
