import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/users";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Do not work first promise");
      })
      .then((response) => this.setState({ users: response }));
  }

  render() {
    const { users } = this.state;
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name}
                    <p>
                        {user.description}
                    </p>
                    <img src={user.image} alt=""/>
                </li>
            ))}
        </ul>
    )
  }
}

export default Users;
