import Watcher from './Watcher'

export function observe(data) {
  if (typeof data !== 'object') return;
  if (Array.isArray(data)) {
    // TODO Array原型方法变异
    data.map(item => observe(item));
  }

  Object.keys(data).map(key => {
    let value = data[key];
    observe(value);
    const deps = [];
    Object.defineProperty(data, key, {
      get() {
        Watcher.target && deps.push(Watcher.target);
        return value;
      },
      set(newVal) {
        if (newVal === value) return;
        value = newVal
        data[key] = newVal;
        observe(newVal);
        deps.map(dep => {
          dep.notify();
        })
      }
    })
  });
}