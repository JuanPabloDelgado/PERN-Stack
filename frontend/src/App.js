import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Menu from "./components/menu/menu";
import UserCard from "./components/card/card";

const card = {
  display: "flex",
  "flex-direction": "column",
  width: "250px",
  height: "250px",
  "align-items": "flex-start",
  margin: "10px"
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      users: []
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addUser(e) {
    e.preventDefault();
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

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Menu />
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
              <UserCard
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
