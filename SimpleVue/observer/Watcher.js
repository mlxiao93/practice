export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.cb = cb;

    if (typeof expOrFn !== 'function') {
      expOrFn = Function.call(null, 'vm', `vm.${expOrFn}`);
    }

    Watcher.target = this;
    expOrFn.call(vm, vm);    // 执行表达式函数，触发get收集依赖
    Watcher.target = undefined;
  }

  notify() {
    this.cb.call(this.vm, this.vm)
  }
}