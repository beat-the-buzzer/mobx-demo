import { observable, action, computed } from 'mobx';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

class Todo {
  id = Math.random();
  @observable title = '';
  @observable finished = false;

  constructor(title) {
    this.title = title;
  }
}

class Store {
  @observable todos = [];
  @action.bound onAdd(title) {
    this.todos.unshift(new Todo(title));
  }
  @computed get left() {
    return this.todos.filter(value => !value.finished).length;
  }
}
var store = new Store();



@observer
class TodoList extends Component {

  state = {
    inputValue: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var { store } = this.props;
    var { inputValue } = this.state;
    store.onAdd(inputValue);
    this.setState({
      inputValue: ''
    });
  }

  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({
      inputValue 
    })
  }

  render() {
    const store = this.props.store;
    const todos = store.todos;
    console.log(store.todos);
    
    console.log(store.todos);
    return <div className="todo-list">
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.inputValue}/>
        <button type="submit">提交</button>
      </form>
      <ul>
        {
          todos.map(value => {
            return <li key={value.id}>{value.title}</li>
          })
        }
      </ul>
      <div>未完成的数量是：{store.left}</div>
    </div>
  }
}

ReactDOM.render(<TodoList store={store} />, document.querySelector('#root'));