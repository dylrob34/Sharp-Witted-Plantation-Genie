import React, { Component } from 'react';

export class Home extends Component {
<<<<<<< HEAD
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

=======
  static displayName = Home.name;
  state = {
    isLoading: true,
    user: { },
    isAuthenticated: false
  }
>>>>>>> develop
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
<<<<<<< HEAD
    const user = this.state.user;
    const content = this.state.isLoading ? <p>Loading</p> : (
      <div>
        <p>first name: {user.firstName}</p>
        <p>last name: {user.lastName}</p>
      </div>
    );
=======
    const {user} = this.state;
    let content;

    if (this.state.isLoading) content = <p>Loading...</p>

    if (!this.state.isAuthenticated) content = <p> You are not authenticated... </p>

>>>>>>> develop
    return (
      <div>
        {content}
      </div>
    );
  }
}
