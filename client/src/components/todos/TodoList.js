import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTodos } from "../../action";
import TodoItem from "./TodoItem";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <>
        <Typography
          align="center"
          style={{ fontFamily: "'Bitter', serif", fontWeight: "10" }}
          component="h3"
          variant="h2"
        >
          Todo List
        </Typography>
        <Divider
          variant="fullWidth"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
        {this.props.todo.length !== 0 ? (
          this.props.todo.map(todo => <TodoItem key={todo._id} todo={todo} />)
        ) : (
          <Typography
            align="center"
            component="h4"
            variant="h5"
            color="textSecondary"
          >
            No Todos Available
          </Typography>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  todo: state.todo
});

export default connect(
  mapStateToProps,
  { fetchTodos }
)(TodoList);
