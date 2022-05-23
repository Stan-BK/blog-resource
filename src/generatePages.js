const MarkdownIt = require('markdown-it')
const fs = require('fs').promises
const path = require('path')
const resolvePath = (...args) => path.resolve(__dirname, ...args)
const md = new MarkdownIt()
async function readDir(dir) {
  return fs.readdir(resolvePath(dir))
}
async function generatePages(rootDir) {
  const dirs = await readDir(rootDir)
  try {
    for (const dir of dirs) {
      const files = await readDir(resolvePath(rootDir, dir))
      for (const file of files) {
        const fileSource = await fs.readFile(resolvePath(rootDir, dir, file), 'utf8')
        const fileAlias = file.replace('.md', '.html')
        await generatePage(dir, fileSource, fileAlias)
      }
    }
  } catch(e) {
    console.log('File operations error', e)
  }
}
async function generatePage(dir, file, fileName) {
  let res = md.render(file)
  await fs.mkdir(resolvePath('../docs', dir), { recursive: true })
  return fs.writeFile(resolvePath('../docs', dir, fileName), res)
}
module.exports = generatePages