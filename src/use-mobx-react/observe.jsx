import { observe, observable, action, computed } from 'mobx';
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

  @action.bound toggle() {
    this.finished = !this.finished;
  }
}

class Store {
  @observable todos = [];
  disposers = [];

  constructor() {
    observe(this.todos, change => {
      this.disposers.forEach(disposer => disposer());

      this.disposers = [];

      for (let todo of change.object) {
        var disposer = observe(todo, changex => {
          console.log(changex);
        });
        this.disposers.push(disposer);
      }
      // Todo里面的内容发生改变时监控变化（需要先实现修改的功能 => 将待办项的状态改成已完成）

      console.log(change); // Todo改变时监控变化
    })
  }

  @action.bound onAdd(title) {
    this.todos.unshift(new Todo(title));
  }
  @computed get left() {
    return this.todos.filter(value => !value.finished).length;
  }
}
var store = new Store();

@observer
class TodoItem extends Component {

  handleChange = e => {
    this.props.todo.toggle();
  }

  render() {
    const todo = this.props.todo;
    return <div>
      <input type="checkbox" className="toggle" checked={todo.finished} onChange={this.handleChange}/>
      <span className="title">{todo.title}</span>
    </div>;
  }
}

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
    return <div className="todo-list">
      <form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleChange} value={this.state.inputValue} />
        <button type="submit">提交</button>
      </form>
      <ul>
        {
          todos.map(value => {
            return <li key={value.id}><TodoItem todo={value}/></li>
          })
        }
      </ul>
      <div>未完成的数量是：{store.left}</div>
    </div>
  }
}

ReactDOM.render(<TodoList store={store} />, document.querySelector('#root'));