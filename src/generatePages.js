const MarkdownIt = require('markdown-it')
const fs = require('fs').promises
const path = require('path')
const resolvePath = (...args) => path.resolve(__dirname, ...args)
const md = new MarkdownIt()
const string = require('string')
const legacySlugify = s => {
  return string(s).slugify().toString()
}

md.use(require('markdown-it-highlightjs'), { inline: true })
md.use(require('markdown-it-anchor'), {
  slugify: legacySlugify
})

let template

async function readDir(dir) {
  return fs.readdir(resolvePath(dir))
}
async function generatePages(rootDir) {
  template = await fs.readFile(resolvePath('../index.html'), 'utf-8')
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
  res = template.replace('{{}}', res)
  await fs.mkdir(resolvePath('../docs', dir), { recursive: true })
  return fs.writeFile(resolvePath('../docs', dir, fileName), res)
}
module.exports = generatePages