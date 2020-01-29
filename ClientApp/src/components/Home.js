import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
            },
            isLoading: true,
        }
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
    const user = this.state.user;
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
