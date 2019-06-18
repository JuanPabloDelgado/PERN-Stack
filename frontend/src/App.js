import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      users: [],
      editId: ""
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addUser(e) {
    e.preventDefault();

    if (this.state.editId) {
      fetch(`http://localhost:5000/users/${this.state.editId}`, {
        method: "PUT",
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName
        }),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(data => {
          this.fetchUsers();
          this.setState({
            firstName: "",
            lastName: "",
            editId: ""
          });
        })
        .catch(err => console.log("Error: ", err));
    } else {
      fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            firstName: "",
            lastName: ""
          });
          this.fetchUsers();
        })
        .catch(err => console.log("Error: ", err));
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  fetchUsers() {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }

  editUser(id) {
    fetch(`http://localhost:5000/users/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          editId: data.id
        });
      })
      .catch(err => console.log("Error: ", err));
  }

  deleteUser(id) {
    if (window.confirm("Está seguro de querer eliminar este usuario")) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(data => {
          this.fetchUsers();
        })
        .catch(err => console.log("Error: ", err));
    }
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button style={{ color: "white" }}>PERN STACK</Button>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <Card className="card">
            <form onSubmit={this.addUser}>
              <CardContent>
                <Typography>
                  <label>First Name</label>
                  <input
                    name="firstName"
                    onChange={this.handleChange}
                    placeholder="Enter a user first name"
                    value={this.state.firstName}
                  />
                </Typography>
                <br />
                <Typography>
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    onChange={this.handleChange}
                    placeholder="Enter a user first name"
                    value={this.state.lastName}
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button type="submit" size="small" className="button">
                  Add User
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
        <div id="listCards">
          {this.state.users.map(user => {
            return (
              <Card className="card" key={user.id}>
                <CardContent>
                  <label>First Name</label>
                  <Typography>{user.firstName}</Typography>
                  <label>Last Name</label>
                  <Typography>{user.lastName}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.editUser(user.id)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
