// 回溯

function dfs(node, target) {
  if (!node) return null;
  if (node.v === target) return node;
  let lFind = dfs(node.l, target);
  if (lFind) return lFind;
  return dfs(node.r, target);  
}

node = {
  v: 0,
  l: {
    v: 1,
    l: {
      v: 2
    },
    r: {
      v: 3
    }
  },
  r: {
    v: 4,
    l: {
      v: 4
    }
  }
}

console.log(dfs(node, 3));