function htmlToJson(html) {
  function matchTagStart(s) {
    if (!s) return false;
    if (matchTagEnd(s)) return false;
    const match = s.match(/^<(.+?)>/);
    if (!match) return  false;
    return {
      tag: match[1],
      length: match[0].length
    }
  }

  function matchTagEnd(s) {
    if (!s) return false;
    const match = s.match(/^<\/(.+?)>/);
    if (!match) return  false;
    return {
      tag: match[1],
      length: match[0].length,
    }
  }


  function matchTextNode(s) {
    if (!s) return false;
    if (matchTagStart(s) || matchTagEnd(s)) return false;
    const match = s.match(/^.+?(?=(<\/?.+?>)|$)/);
    if (!match) return  false;
    return {
      text: match[0],
      length: match[0].length
    }
  }

  const stack = [];
  const root = {root: true, children: []}
  let parentNode = root;

  for (let i = 0; i < html.length;) {
    let subHtml = html.substr(i, html.length);
    let match = matchTagStart(subHtml);
    if (match) {
      let node = {
        tag: match.tag,
        children: []
      }
      parentNode.children.push(node)
      match.node = node;
      stack.push(match);
      i += match.length;
      parentNode = node;
      continue;
    }

    match = matchTagEnd(subHtml);
    if (match) {
      let startMatch = stack.pop();
      if (startMatch.tag !== match.tag) throw '存在未闭合标签';
      let peakMatch = stack.slice(-1)[0];
      parentNode = peakMatch && peakMatch.node || root;
      i += match.length;
      continue;
    }

    match = matchTextNode(subHtml);
    if (match) {
      let node = {
        text: match.text
      }
      parentNode.children.push(node);
      i += match.length;
    }
  }

  return root
}


console.log(htmlToJson(`<div>mmm<span>aaa</span><span>bbb</span></div>`))