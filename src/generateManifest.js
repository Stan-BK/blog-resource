const fs = require('fs').promises
const path = require('path')
const resolvePath = (...args) => path.resolve(__dirname, ...args)

async function generateManifest() {
  let pageInfo = await fs.readFile(resolvePath('../docs', 'manifest.json'), 'utf-8')
  let dialogs = [] // 记录存在的分类
  pageInfo = JSON.parse(pageInfo)

  const dialog = await fs.readdir(resolvePath('../pages'))
  for (const dialogname of dialog) {
    dialogs.push(dialogname)
    if (!pageInfo[dialogname]) {
      pageInfo[dialogname] = {}
    }
    const files = await fs.readdir(resolvePath('../pages', dialogname))
    pageInfo[dialogname]['sum'] = files.length
    pageInfo[dialogname]['pages'] = files.map(item => item.replace('.md', '.html'))
  }

  for (const key of Object.keys(pageInfo)) {
    if (!dialogs.includes(key)) {
      delete pageInfo[key]
    }
  }
  await fs.writeFile(resolvePath('../docs', 'manifest.json'), JSON.stringify(pageInfo, undefined, 2))
}
module.exports = generateManifest