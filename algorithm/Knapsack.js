/**
 * https://segmentfault.com/a/1190000012829866
 *
 * 0-1背包问题：
 * 小明家有n件物品，
 * 已知每件物品的重量(w), 和价值(v)
 * 小偷去小明家偷东西, 带了个容量为C的背包
 * 求小偷的最大收获
 *
 */

const W_MAP = [2, 2, 6, 5, 4];
const V_MAP = [6, 3, 5, 4, 6];
const CAPACITY = 10;


// 非递归
function knapsack(w_map, v_map, CAPACITY) {
  const f = [];
  const n = W_MAP.length;

  function max(v1, v2) {
    return v1 > v2 ? v1: v2;
  }

  for (let i = 0; i < n; i++) {
    f[i] = f[i] || [];
    for (let c = 0; c <= CAPACITY; c++) {
      if (i === 0) {
        if (c < w_map[i]) {
          f[i][c] = 0;
        } else (
            f[i][c] = v_map[i]
        )
      } else {
        if (c < w_map[i]) {
          f[i][c] = f[i - 1][c];
        } else {
          f[i][c] = max(f[i - 1][c],v_map[i] + f[i - 1][c - w_map[i]]);
        }
      }
    }
  }
  return f[n - 1][CAPACITY];
}


// 递归
function knapsackRecursion(w_map, v_map, CAPACITY) {

  function max(v1, v2) {
    return v1 > v2 ? v1: v2;
  }
  const n = W_MAP.length;

  function f (i, c) {
    if (i < 0) return 0;
    if (i === 0) {
      if (c < w_map[i]) return 0;
      return v_map[i];
    } else {
      if (c < w_map[i]) return f(i - 1, c);
      return max(f(i - 1, c), v_map[i] + f(i - 1, c - w_map[i]))
    }
  }

  return f(n - 1, CAPACITY);
}

console.log(knapsack(W_MAP, V_MAP, CAPACITY));
console.log(knapsackRecursion(W_MAP, V_MAP, CAPACITY));