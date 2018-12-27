import { observable, computed, autorun, when, reaction, action,runInAction } from 'mobx';

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

  @action bar() {
    this.string = 'world';
    this.number = 0;
  }

  @action.bound anotherBar() {
    this.string = 'new world';
    this.number = 666;
  }
}

// action 任何修改状态的行为，将多次修改状态的行为合并成一次，从而减少触发autorun、reaction的次数
var store = new Store();

reaction(() => [store.string,store.number], arr => console.log(arr.join('/')));

runInAction('modify', () => {
  store.string = 'hehe';
  store.number = 110;
});

// 随时定义action，甚至是匿名action

