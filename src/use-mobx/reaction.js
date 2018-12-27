import { observable, computed, autorun, when, reaction } from 'mobx';

class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = 'hello';
  @observable number = 20;
  @observable bool = false;

  @computed get mixed() {
    return this.string + '/' + this.number;
  }
}

var store = new Store();

reaction(() => [store.string,store.number], arr => console.log(arr.join('/')));

// 初始化的时候，第一个函数先执行一次，让mobx知道哪些数据被暗中观察了，并在这些数据被修改后执行第二个函数

store.string = 'world';
store.number = 0;

// 在没有数据的时候，我们不想，也没有必要去执行渲染UI的逻辑

// 问题：频繁的数据变化会重复触发副作用