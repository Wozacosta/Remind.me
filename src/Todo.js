/*
  run json server with:
  json-server --watch db.json --port 5000
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import { CREATE_TODO, INIT_TODOS, REMOVE_TODO, CHANGE_STATUS } from './reducers';

import { TodoForm } from './TodoForm';
import { connect } from 'react-redux';

// const {height, width} = Dimensions.get('window')
// console.warn(`h = ${height}, widht = ${width}`);

export class _Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodo: '',
    };
    this.handlePress = this.handlePress.bind(this);
    this.onPressTodo = this.onPressTodo.bind(this);
    this.onRemoveTodo = this.onRemoveTodo.bind(this);
  }

  componentWillMount() {
    fetch('http://192.168.1.25:5000/todos', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(todos => {
        this.props.initTodos(todos);
      });
  }

  handlePress() {
    let { newTodo } = this.state;
    let payload = {
      name: newTodo,
      done: false,
    };
    // payload[newTodo] = false;
    console.log(`payload = ${payload}`);
    fetch('http://192.168.1.25:5000/todos', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(newTodo => {
        // console.log(newTodo);
        // let todos = Object.assign({}, this.state.todos, data);
        this.props.createTodo(newTodo);
        this.setState({ newTodo: '' });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChange(text) {
    this.setState({ newTodo: text });
  }

  onPressTodo(id) {
    let indexToPatch = this.props.todos.findIndex(todo => {
      return todo.id === id;
    });

    let payload = {
      done: this.props.todos[indexToPatch].done,
    };

    this.props.changeStatus(id);

    fetch(`http://192.168.1.25:5000/todos/${id}`, {
      method: 'patch',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  onRemoveTodo(id) {
    this.props.removeTodo(id);

    fetch(`http://192.168.1.25:5000/todos/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>remind.me</Text>
        <TodoForm
          handlePress={this.handlePress.bind(this)}
          handleChange={this.handleChange.bind(this)}
          value={this.state.newTodo}
        />
        <View style={styles.listTodos}>
          {this.props.todos.length > 0 &&
            this.props.todos.map((todo, i) => {
              return (
                <View key={i} style={styles.todoWrap}>
                  <TouchableNativeFeedback
                    onPress={() => this.onPressTodo(todo.id)}>
                    <Text style={[styles.todo, todo.done && styles.todoDone]}>
                      {todo.name}
                    </Text>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={() => this.onRemoveTodo(todo.id)}>
                    <Text> 🗑</Text>
                  </TouchableNativeFeedback>
                </View>
              );
            })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapActionsToProps = dispatch => ({
  createTodo(todo) {
    dispatch({ type: CREATE_TODO, payload: todo });
  },
  initTodos(todos) {
    dispatch({ type: INIT_TODOS, payload: todos });
  },
  removeTodo(id) {
    dispatch({ type: REMOVE_TODO, payload: id });
  },
  changeStatus(id) {
    dispatch({ type: CHANGE_STATUS, payload: id});
  }
});

export const Todo = connect(mapStateToProps, mapActionsToProps)(_Todo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ef235f',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    marginTop: 25,
    fontSize: 32,
    color: 'white',
    fontWeight: '200',
    fontFamily: 'Roboto',
    // fontFamily: 'sans-serif',
  },

  listTodos: {
    // flex: 4,
    marginTop: 40,
  },
  todoWrap: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
  },
  todo: {
    marginBottom: 10,
    fontSize: 16,
  },
  todoDone: {
    textDecorationLine: 'line-through',
  },
});
