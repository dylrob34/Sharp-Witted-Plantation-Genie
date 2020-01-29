import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
  state = {
    isLoading: true,
    user: { },
    isAuthenticated: false
  }
  async componentDidMount(){
    const response = await fetch('api/user/dylana1998');
    if (!response.ok){
      this.setState({ isAuthenticated: false });
      return;
    }
    const user = await response.json();
    this.setState({ user: user, isLoading: false })
  }
  render () {
    const {user} = this.state;
    let content;

    if (this.state.isLoading) content = <p>Loading...</p>

    if (!this.state.isAuthenticated) content = <p> You are not authenticated... </p>

    return (
      <div>
        {content}
      </div>
    );
  }
}
