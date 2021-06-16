import rskTestnetImages from '../../../imagesexpress/lib/imagesdata.js'
import { parseImages } from './utils.js'

const rskTestnet = parseImages(rskTestnetImages)
const description = 'Watercolor painting practice'

const portrait = {
  extension: 'jpg',
  title: 'Portrait',
  width: 600,
  height: 806,
  description
}

rskTestnet['0xC8491A0bD234c571388eFA0FCf2A2f2ef8465f1D'] = portrait

export default {
  ethMainnet: {
    '0xccA81B36452890798538140912A8d7E4c57846bB': {
      title: 'Fish',
      extension: 'jpg',
      width: 800,
      height: 1363,
      description
    },
    '0xD1D20c719b3aBef8c31b2d7A26253F5A4F6F1170': {
      title: 'Fruits',
      extension: 'jpg',
      width: 465,
      height: 484,
      description
    }
  },
  ethRopsten: {},
  rskMainnet: {
    '0xa80d1090d95787eb445b8b7c3c988c41357c0604': portrait,
    '0x08F18ED92929FaA1f115C55a5e5Dde28bA02F52e': {
      title: 'Butterfly',
      width: 598,
      height: 526,
      extension: 'jpg',
      description
    },
    '0x5617aeb81204906e3b77d70123e9923e062abc2d': {
      title: 'Woman',
      width: 900,
      height: 1217,
      extension: 'jpg',
      description
    },
    '0x75fd4a189b3b4d1e44dd1919de3fcb1d3588f833': {
      title: 'Eiffel',
      width: 800,
      height: 1138,
      extension: 'jpg',
      description
    },
    '0x9d576DbD4b6D333d9F496b639B4687Cb41ff3e46': {
      title: 'Squirrel',
      width: 1000,
      height: 1417,
      extension: 'jpg',
      description
    }
  },
  rskTestnet
}
