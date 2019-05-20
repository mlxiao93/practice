const data = {
  a: 1,
  b: 2
}

const deps = [];
const propKeys = Object.keys(data);

const watch = function(exp, fu) {

  // Object.defineProperty(data,)
}


watch('a', function() {
  console.log('a changed');
})