import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodo, doneTodo } from "../../action";
import { Link as RL } from "react-router-dom";
import {
  Link,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Typography,
  Button
} from "@material-ui/core";

class TodoItem extends Component {
  state = {
    expanded: null,
    done: this.props.todo.done
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  onDelete = id => {
    this.props.deleteTodo(id);
  };

  ondoneTodo = e => {
    e.stopPropagation();
    const { todo } = this.props;
    this.setState({
      done: !this.state.done
    });
    this.props.doneTodo(todo, todo._id);
  };

  helperFunction = () => {
    if (this.state.done) {
      return { margin: "0 auto", textDecoration: "line-through" };
    }
    return { margin: "0 auto" };
  };

  render() {
    const { expanded } = this.state;
    const { description, title, _id } = this.props.todo;

    return (
      <ExpansionPanel
        style={{ width: "90%", margin: "0 auto" }}
        expanded={expanded === "panel1"}
        onChange={this.handleChange("panel1")}
      >
        <ExpansionPanelSummary>
          {this.state.done ? (
            <i
              onClick={this.ondoneTodo}
              className="fas fa-check-square"
              style={{
                marginRight: "15px",
                fontSize: "30px",
                color: "#16770b"
              }}
            />
          ) : (
            <i
              onClick={this.ondoneTodo}
              className="far fa-square"
              style={{
                color: "#595353",
                fontSize: "30px",
                marginRight: "15px"
              }}
            />
          )}
          <Typography
            variant="h5"
            style={this.helperFunction()}
            component="header"
          >
            {title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>{description}</Typography>
          <div style={{ marginLeft: "auto" }}>
            <Link
              to={{
                pathname: "/todo/update",
                state: { title, desc: description, id: _id }
              }}
              component={RL}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "5px" }}
              >
                <i className="fas fa-edit" style={{ color: "white" }} />
              </Button>
            </Link>
            <Link style={{ textDecoration: "none", color: "white" }}>
              <Button
                variant="contained"
                color="secondary"
                aria-label="Delete"
                onClick={() => this.onDelete(this.props.todo._id)}
              >
                <i className="fas fa-trash-alt" />
              </Button>
            </Link>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default connect(
  null,
  {
    deleteTodo,
    doneTodo
  }
)(TodoItem);
