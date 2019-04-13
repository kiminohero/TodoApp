import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "./action";

// COMPONENTS FOR RENDERING
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import TodoList from "./components/todos/TodoList";
import AddTodo from "./components/todos/AddTodo";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/todos" component={TodoList} />
          <Route exact path="/todo/add" component={AddTodo} />
          <Route
            exact
            path="/todo/update"
            render={props => <AddTodo {...props} isAuthed={true} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
