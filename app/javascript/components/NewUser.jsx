import React from "react";
import { Link } from "react-router-dom";

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, "&lt").replace(/>/g, "&gt");
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/users";
    const { name, description } = this.state;

    if (name.length == 0 || description.length == 0) return;

    const body = {
      name,
      description: description.replace(/\n/g, "<br> <br>")
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok in NewUser.");
      })
      .then((response) => this.props.history.push(`/user/${response.id}`))
      .catch((error) => console.log(error.message));
  }

  render() {
    return (
      <div className="container p-5">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="userName">
              Name:
              <input
                type="text"
                id="userName"
                name="name"
                className="form-control"
                required
                onChange={this.onChange}
              />
              <small id="userName" className="form-text text-muted">
                Juste your name
              </small>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="userDescription">
              Description :
              <textarea
                className="form-control"
                row="3"
                name="description"
                id="userDescription"
                onChange={this.onChange}
              ></textarea>
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            Create user
          </button>
          <Link to="/users" className="btn btn-link mt-3">
            Back to All Users
          </Link>
        </form>
      </div>
    );
  }
}

export default NewUser;
