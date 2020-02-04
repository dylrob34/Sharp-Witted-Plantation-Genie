import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Buy } from './components/Buy';
import LoginPopover from './components/LoginSignUpPopover';
import { SignUp } from './components/SignUp';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/buy' component={Buy} />
        <ProtectedRoute path='/dashboard' component={Dashboard} />
      </Layout>
    );
  }
}
