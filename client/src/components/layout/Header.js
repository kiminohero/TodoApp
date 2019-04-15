import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";

class Header extends Component {
  contentRender() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px",
              marginLeft: "auto"
            }}
          >
            <a
              href="/auth/google"
              style={{ color: "white", textDecoration: "none" }}
            >
              <i className="fab fa-google" style={{ marginRight: "5px" }} />
              Google Login
            </a>
          </Button>
        );
      default:
        return [
          <Button
            key="1"
            variant="contained"
            color="secondary"
            style={{ marginLeft: "auto" }}
          >
            <Link
              to="/todo/add"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fas fa-plus" style={{ marginRight: "5px" }} />
              Add Todo
            </Link>
          </Button>,
          <Button
            key="2"
            variant="contained"
            color="primary"
            style={{ marginLeft: "auto" }}
          >
            <a
              href="/api/logout"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i
                className="fas fa-sign-out-alt"
                style={{ marginRight: "5px" }}
              />
              Logout
            </a>
          </Button>
        ];
    }
  }

  render() {
    return (
      <div>
        <AppBar
          position="static"
          style={{ backgroundColor: "#0F0F0F", marginBottom: "10px" }}
        >
          <ToolBar>
            <Typography color="primary" variant="h6">
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={this.props.auth ? "/todos" : "/"}
              >
                <i
                  className="fas fa-clipboard-check"
                  style={{ marginRight: "5px" }}
                />
                Todo App
              </Link>
            </Typography>
            {this.contentRender()}
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Header);
