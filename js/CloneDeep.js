function cloneDeep(origin, parentList = []) {     // parentList用于处理循环引用
  if (origin === null || typeof origin !== 'object') return origin;     // 原始类型直接返回
  if (origin instanceof Function || origin instanceof Error) return origin;    // 函数、Error实例原样返回, lodash 返回 {}
  if (origin instanceof Date)  return new Date(+origin);   // 处理 Date 实例

  if (origin instanceof RegExp) {    // 处理 RexExp 实例
    let result = new origin.constructor(
        origin.source,
        /w*$/.exec(origin)        // 取出 flag
    )
    result.lastIndex = origin.lastIndex;
    return result;
  }

  if (origin instanceof Array) {
    let target = [];
    origin.map(item => {
      target.push(cloneDeep(item, parentList));
    })
    return target;
  }

  // 以下都当成 [object Object] 处理

  // 处理循环引用
  for (let index in parentList) {
    let parent = parentList[index];
    if (origin === parent.origin) return parent.target;
  }

  let target = {};
  parentList.push({origin, target})  // 处理循环引用

  Object.getOwnPropertyNames(origin).map(prop => {
    target[prop] = cloneDeep(origin[prop], parentList)
  });

  return target;
}

var test = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: {
    name: '我是一个对象',
    id: 1
  },
  arr: [{a: 1}, 1, 2],
  func: function() {
    console.log('我是一个函数')
  },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  err: new Error('我是一个错误')
}

test.test = test;

var test1 = cloneDeep(test);

console.log(test, test1);