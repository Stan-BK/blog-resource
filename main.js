const MarkdownIt = require('markdown-it')
const path = require('path')
const fs = require('fs').promises
const resolvePath = (...args) => path.resolve(__dirname, ...args)
const md = new MarkdownIt()
async function readDir(dir) {
  return fs.readdir(resolvePath(dir))
}
async function readFile(dir) {
  const files = await readDir(dir)
  for (var filePath of files) {
    const file = await fs.readFile(resolvePath(dir, filePath), 'utf8')
    const fileAlias = filePath.replace('.md', '.html')
    let res = md.render(file)
    await fs.writeFile(resolvePath('pages', fileAlias), res)
  }
}
readFile('docs')
