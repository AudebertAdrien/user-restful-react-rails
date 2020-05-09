import React from "react";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  deleteUser() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const token = document.querySelector('meta[name="csrf-token"]').content;
    const url = `/api/v1/users/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      }
    })
      .then(response => {
          if (response.ok) {
              console.log(response)
              return response.json()
          }
          throw new Error("Network do not work form User/deleteUser")
      })
      .then(() => this.props.history.push("/users"))
      .catch(error => console.log(error.message))
    };
  

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `/api/v1/users/${id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Do not response from component/User");
      })
      .then((response) => this.setState({ user: response }))
      .catch(() => this.props.history.push("/users"));
  }

  addHtmlEntities(str) {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  render() {
    const { user } = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={user.image}
            alt={`${user.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {user.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteUser}
              >
                Delete User
              </button>
            </div>
          </div>
          <Link to="/users" className="btn btn-link">
            Back to all Users
          </Link>
        </div>
      </div>
    );
  }
}

export default User;
