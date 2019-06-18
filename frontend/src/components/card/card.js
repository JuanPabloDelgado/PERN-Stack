import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const card = {
  display: "flex",
  "flex-direction": "column",
  width: "250px",
  height: "250px",
  "align-items": "center",
  margin: "10px"
};

class UserCard extends Component {
  render() {
    return (
      <Card className="card">
        <CardContent>
          <Typography>{this.props.firstName}</Typography>
          <Typography>{this.props.lastName}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default UserCard;
