import {observe} from './observer'
import Watcher from './observer/Watcher'
import {compiler, compileToFunctions} from './compiler'

export default class Vue {
  constructor(options = {}) {
    this._data = options.data.call(this);
    this.$options = options;

    options.components = [];

    Object.keys(this._data).map(key => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key];
        },
        set(value) {
          this._data[key] = value;
        }
      })
    });

    observe(this._data);

    options.created && options.created.call(this);

    Object.keys(options.watch).map(key => {
      const item = options.watch[key];
      new Watcher(this, key, item.handler);
    });

    const update = compiler(this);
    new Watcher(this, update, update);

    options.mounted && options.mounted.call(this);
  }
}