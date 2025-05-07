import { observable, action, decorate } from 'mobx';

export class BasicStore {
  data = {};

  set = (name, value) => {
    this.data[name] = value;
  };

  remove = (name) => {
    delete this.data[name];
  };

  reset = () => {
    this.data = {};
  };
}
decorate(BasicStore, {
  data: observable,
  set: action,
  remove: action,
  reset: action,
});
