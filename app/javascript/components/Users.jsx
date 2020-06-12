import React from "react";
import { Link } from "react-router-dom";

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
        throw new Error("Do not response from component/Users");
      })
      .then((response) => this.setState({ users: response }))
      .catch(() => this.props.history.push("/"));
  }

  render() {
    const { users } = this.state;

    const allUsers = users.map((user, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4" style={{ width: 18 + "rem" }}>
          <img src={user.image} className="card-img-top" alt={`${user.name}`} />
          <div className="class-body">
            <h5 className="class-title">{user.name}</h5>
            <p className="card-text">{user.description}</p>
            <Link to={`user/${user.id}`} className="btn custom-button">
              View user profile
            </Link>
          </div>
        </div>
      </div>
    ));

    const noUsers = (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1>There are no users for the moment</h1>
          <p>Be the one who will create a new business.</p>
        </div>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All the professional</h1>
            <p className="lead text-muted">
              We’ve pulled together our most popular users
            </p>
          </div>
        </section>

        <div className="container">
          <div className="row mb-3 justify-content-between">
            <Link to="/" className="btn custom-button">
              Back to Home
            </Link>
            <Link to="/users/create" className="btn custom-button">
              Create User Profile
            </Link>
          </div>

          <div className="row">{users.length > 0 ? allUsers : noUsers}</div>
        </div>
      </>
    );
  }
}

export default Users;
