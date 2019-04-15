import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo, updateTodo } from "../../action";
import { withRouter } from "react-router-dom";
import {
  Divider,
  Button,
  Card,
  TextField,
  Typography
} from "@material-ui/core";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      Ptitle: "Add Todo",
      button: "Add"
    };
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.setState({
        title: "",
        desc: "",
        PTitle: "Add Todo",
        button: "Add"
      });
    } else {
      this.setState({
        title: this.props.location.state.title,
        desc: this.props.location.state.desc,
        PTitle: "Update Todo",
        button: "Update"
      });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const todo = {
      description: this.state.desc,
      title: this.state.title
    };
    if (this.props.location.state === undefined) {
      this.props.addTodo(todo, this.props.history);
    } else {
      this.props.updateTodo(
        todo,
        this.props.location.state.id,
        this.props.history
      );
    }
  };

  goBack = () => {
    this.props.history.push("/todos");
  };

  render() {
    return (
      <div>
        <Card
          raised="true"
          style={{ width: "60%", margin: "0 auto", padding: "10px" }}
        >
          <Typography
            style={{ marginBottom: "10px" }}
            variant="h3"
            align="center"
          >
            {this.state.PTitle}
          </Typography>
          <Divider style={{ marginBottom: "10px" }} />
          <form
            onSubmit={this.onSubmit}
            style={{ width: "90%", margin: "0 auto" }}
          >
            <TextField
              id="outlined-name"
              label="Title"
              value={this.state.title}
              type="text"
              name="title"
              placeholder="Enter Title"
              variant="outlined"
              onChange={this.onChange}
              required
              fullWidth
            />
            <TextField
              id="outlined-name"
              type="text"
              label="Description"
              placeholder="Enter Desciption"
              value={this.state.desc}
              name="desc"
              onChange={this.onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
            />
            <Button
              variant="outlined"
              style={{ outlineColor: "green", color: "green" }}
              type="submit"
            >
              {this.state.button}
            </Button>
            <Button
              variant="outlined"
              style={{ outlineColor: "red", color: "red", float: "right" }}
              onClick={this.goBack}
            >
              <i
                className="fas fa-angle-left"
                style={{ marginRight: "10px" }}
              />
              Back
            </Button>
          </form>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  {
    addTodo,
    updateTodo
  }
)(withRouter(AddTodo));
