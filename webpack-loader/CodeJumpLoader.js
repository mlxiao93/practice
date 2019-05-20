module.exports = function (source) {
  const resourcePath = this.resourcePath;
  if (/\/src\/index.html$/.test(resourcePath)) return source;
  source = source.replace(/<(?:\s+)?(div)((?:[^\/>]+)?)>/g, `<$1 $2 data-resource-path=${resourcePath}>`)
  return source;
}