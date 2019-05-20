import Vue from '../SimpleVue'

test('Vue constructor', () => {
  const vm = new Vue({
    data() {
      return {
        a: 1
      };
    }
  })
  expect(vm.a).toBe(1);
});