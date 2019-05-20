import './index.scss'

import Vue from 'vue/dist/vue'

import Foo from './Foo.vue'

Vue.config.productionTip = false;

new Vue({
  components: { Foo },
  template: require('./app.html'),
  el: '#app'
});