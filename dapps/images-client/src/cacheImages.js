// import { openClient, getChunk, getNoChunks } from '../../imagesexpress/lib/files'
import config from './lib/config.js'
import Files from '../../imagesexpress/lib/files.js'
import fs from 'fs'
import { promisify } from 'util'
import path from 'path'

const writeFile = promisify(fs.writeFile)

const cacheDir = './public/cache'

async function saveImage (address, { extension, dir }) {
  const fileName = `${address}.${extension}`
  const file = `${dir}/${fileName}`
  if (fs.existsSync(file)) return
  const size = await Files.getNoChunks(address)
  console.log(`Address ${address}, size: ${size}`)
  if (!size) return
  let data = Buffer.from('')
  for (let chunk = 0; chunk < size; chunk++) {
    console.log(`Getting ${address}/${chunk}`)
    const chunkData = await Files.getChunk(address, chunk)
    data = Buffer.concat([data, chunkData])
  }
  await writeFile(file, data)
}

async function cacheNetImages (chainId) {
  const net = config.networks[chainId]
  const { node } = net
  Files.openClient(node)
  if (!node) throw new Error(`Missing node for chainId: ${chainId}, ${net.name}`)
  const { images } = net
  if (!images) return
  const dir = `${cacheDir}/${chainId}`
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  for (const address in images) {
    await saveImage(address, Object.assign({ ...images[address] }, { dir }))
  }
}

async function cache () {
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir)
  for (const chainId in config.networks) {
    await cacheNetImages(chainId).catch(err => console.error(err))
  }
}

cache()
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(9)
  })
