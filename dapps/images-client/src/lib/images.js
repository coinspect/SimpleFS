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
    '0xa80d1090d95787eb445b8b7c3c988c41357c0604': portrait
  },
  rskTestnet
}
