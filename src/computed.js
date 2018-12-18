import {observable,computed} from 'mobx';

class Store{
  @observable array = [];
  @observable obj = {};
  @observable map = new Map();

  @observable string = 'hello';
  @observable number = 20;
  @observable bool = false;
}

// 可以是可观察数据，可以是可观察数据的反应


var store = new Store();

var foo = computed(function(){
  return store.string + '/' + store.number;
});

console.log(foo);
console.log(foo.get());

foo.observe(function(change){
  console.log(change);
});

// 修改string number

store.string = 'world';
store.number = 0;


