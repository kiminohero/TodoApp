import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Typography, Divider } from "@material-ui/core";

class Landing extends Component {
  componentDidMount() {}
  render() {
    if (this.props.auth) {
      this.props.history.push("/todos");
      return <div />;
    } else {
      return (
        <Card style={{ width: "60%", padding: "20px", margin: "30px auto" }}>
          <Typography
            style={{ fontSize: "50px", fontWeight: "bolder" }}
            align="center"
          >
            Todo App
          </Typography>
          <Divider />
          <Typography
            variant="h5"
            align="center"
            style={{ marginTop: "40px", marginBottom: "50px" }}
          >
            Please Login to add todos
          </Typography>
        </Card>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Landing);
