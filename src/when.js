import { observable, computed, autorun, when } from 'mobx';

class Store {
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = 'hello';
  @observable number = 20;
  @observable bool = true;

  @computed get mixed() {
    return this.string + '/' + this.number;
  }
}

var store = new Store();
console.log('before');
when(() => store.bool, () => console.log(`'It's true`));
console.log('after')
store.bool = !store.bool;

// 第一个参数，根据可观察数据计算布尔值
// 如果第一个参数一开始就为真，那么第二个参数的函数会立即执行