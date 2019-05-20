import parse from './parse'
import {generate} from './codegen'
import {installRenderHelpers, createElement} from './helper'

function compileToFunctions(template) {
  console.log(template)
  const ast = parse(template, {})
  console.log(ast)
  const code = generate(ast, {})
  return new Function(code.render);
}

export function compiler(vm) {
  const el = document.querySelector(vm.$options.el);
  const template = el.innerHTML;
  const render = compileToFunctions(template);
  installRenderHelpers(vm)
  console.log(render);
  const _c = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
  vm._c = _c;
  const VNode = render.call(vm, _c);
  console.log(VNode);
  return function () {
    // TODO update dom (patch算法)
  }
}