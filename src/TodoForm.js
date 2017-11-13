import React from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
} from 'react-native';



export const TodoForm = props => (
  <View style={styles.form}>
    <TextInput
      style={styles.input}
      value={props.value}
      onChangeText={props.handleChange}
    />
    <TouchableHighlight style={styles.addTodo} onPress={props.handlePress}>
      <Text style={styles.addTodoText}>Add</Text>
    </TouchableHighlight>
  </View>
);

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'lightblue',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // overflow: 'hidden',
  },
  input: {
    // flex: 1,
    height: 45,
    flex: 0.7,
    padding: 10,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    fontSize: 17,
    // overflow: 'hidden',
  },
  addTodo: {
    height: 45,
    flex: 0.3,
    backgroundColor: 'lightblue',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTodoText: {
    // textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
