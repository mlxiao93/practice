export function debounce(func, interval = 0) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, arguments);
    }, interval)
  }
}

export function throttle(func, interval = 0, options = {}) {
  if (options.trailing === undefined) options.trailing = false;   // 最后一次调用，时间不够，执行
  let lastExecTime, timer;
  return function() {
    timer && clearTimeout(timer);
    if (!lastExecTime) {    // 第一次执行
      lastExecTime = Date.now();
      func.apply(null, arguments);
      return;
    }
    if (Date.now() - lastExecTime >= interval) {   // 执行间隔不小于interval
      lastExecTime = Date.now();
      func.apply(null, arguments);
    } else if (options.trailing) {
      timer = setTimeout(() => {
        lastExecTime = undefined;     // ！！！ 很重要
        func.apply(null, arguments);
      }, interval)
    }
  }
}