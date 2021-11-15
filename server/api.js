const fs = require('fs')
const fnPath = require('path')
const mmm = require('mmmagic')


const listFolder = (path = '/') => {
  const files = []
  const folders = []

  fs.readdirSync(_getFsPath(path), { withFileTypes: true }).forEach(item => {
    if (item.isDirectory()) {
      folders.push(_getFolder(item))
    } else if (item.isFile()) {
      files.push(_getFile(item))
    }
  })
  return {
    path,
    files,
    folders
  }
}

const downloadFile = async (path = '') => {
  return new Promise((resolve, reject) => {
    const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE)
    const magicPath = _getMagicPath(path)
    magic.detectFile(magicPath, (err, mime) => {
      if (err) {
        console.log('Detect error', err);
        reject()
      }
      resolve({
        mime,
        data: fs.readFileSync(_getFsPath(path))
      })
    })
  })
}


module.exports = {
  listFolder,
  downloadFile
}


function _getFile ({ name: fileName }) {
  const [ name, ext ] = fileName.split('.')
  return {
    name,
    ext
  }
}

function _getFolder ({ name }) {
  return {
    name
  }
}

function _getFsPath (path = '/') {
  const prefix = path.startsWith('/') ? '' : '/'
  return `${prefix}${path}`
}

function _getMagicPath (path = '/') {
  const prefix = path.startsWith('/') ? '' : '/'
  return fnPath.resolve(`${prefix}${path}`)
}