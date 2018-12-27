import { observe, observable, action, computed, toJS } from 'mobx';
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
          this.save();
        });
        this.disposers.push(disposer);
      }
      this.save();
    })
  }

  save() {
    console.log(toJS(this.todos));
    // 将可观察的对象转化成正常的对象
    var todos = toJS(this.todos);
    localStorage.setItem('todos',JSON.stringify(todos));
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