import {observable,isArrayLike,computed} from 'mobx';

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
console.log(store.mixed);

store.string = '';
console.log(store.mixed);

// 可以是可观察数据，可以是可观察数据的反应

// autorun

