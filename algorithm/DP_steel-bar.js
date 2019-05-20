// 动态规划

//学习博客 https://blog.csdn.net/u013309870/article/details/75193592

// 钢条切割问题


priceMap = {
  1: 1,
  2: 5,
  3: 5,
  4: 9,
  5: 10,
  6: 17,
  7: 17,
  8: 20,
  9: 24,
  10: 30,
};

// 自顶向下（备忘录法）
maxMap = {
  1: 1,
};
function maxPrice(n) {
  if (maxMap[n] !== undefined) return maxMap[n];
  let max = priceMap[n];
  for (let i = 1; i < n; i++) {
    max = Math.max(max, maxPrice(n - i) + priceMap[i]);
  }
  maxMap[n] = max;
  return max;
}

// 自底向上
function maxPrice(n) {
  const maxMap = {
    1: 1,
  };
  if (maxMap[n] !== undefined) return maxMap[i];
  for (let i = 2; i <= n; i++) {
    maxMap[i] = priceMap[i];
    for (let j = 1; j <= i - j; j++) {
      maxMap[i] = Math.max(maxMap[i], maxMap[j] + maxMap[i - j]);
    }
  }
  return maxMap[n];
}

maxPrice(4);