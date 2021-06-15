import rskTestnetImages from '../../../imagesexpress/lib/imagesdata.js'
import { parseImages } from './utils.js'

const rskTestnet = parseImages(rskTestnetImages)
const description = 'Watercolor painting practice'

export default {
  ethMainnet: {
    '0xccA81B36452890798538140912A8d7E4c57846bB': {
      title: 'Fish',
      extension: 'jpg',
      description
    },
    '0xD1D20c719b3aBef8c31b2d7A26253F5A4F6F1170': {
      title: 'Fruits',
      extension: 'jpg',
      description
    }
  },
  ethRopsten: [],
  rskMainnet: [],
  rskTestnet
}
