import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
  state = {
    isLoading: true,
    user: { }
  }
  async componentDidMount(){
    const response = await fetch('weatherforecast/user');
    const user = await response.json();
    this.setState({ user: user, isLoading: false })
  }
  render () {
    const {user} = this.state;
    const content = this.state.isLoading ? <p>Loading</p> : (
      <div>
        <p>first name: {user.firstName}</p>
        <p>last name: {user.lastName}</p>
      </div>
    );
    return (
      <div>
        {content}
      </div>
    );
  }
}
