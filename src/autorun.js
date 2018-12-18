import {observable,computed,autorun} from 'mobx';

class Store{
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


// autorun
// 自动运行什么 如何触发自动运行

// 1、自动运行传入autorun的函数
autorun(() => {
  // console.log(store.string + '/' + store.number);
  console.log(store.mixed);
});
// 传入autorun的函数先被执行了一次（思考：如果不执行的话，就不知道引用了哪些可观察数据了）

// 2、修改任意autorun里面用到的可观察数据

store.string = 'world'; // 执行了autorun

store.bool = true; // 不执行

// 在可观察数据被修改之后，自动去执行依赖可观察数据的行为