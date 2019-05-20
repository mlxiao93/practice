import Vue from '../SimpleVue'
import parseHTML from '../SimpleVue/compiler/parseHtml'
import parse from '../SimpleVue/compiler/parse'
import {generate} from '../SimpleVue/compiler/codegen'

const vm = new Vue({
  el: '#app',
  data() {
    return {
      foo: 1,
      bar: 2
    }
  },
  watch: {
    foo: {
      handler() {
        console.log(11111);
      }
    },
  },
  created() {
  }
})

window.handleClick = function() {
  vm.foo = 5
}

const templateString = `
<div>
  {{foo}}
  <div v-for="(item, index) in list" :key="index" @click="handleClick"></div>
  <div v-if="1 === 2">111</div>
  <div v-else-if="2 === 3">222</div>
  <div v-else>333</div>
</div>`.replace(/[\r\n]/gm, '');

const ast = parse(templateString, {})

const code = generate(ast, {})

const render = new Function(code.render)



