
import rskTestnetImages from '../../../imagesexpress/lib/imagesdata'
import ethImages from './ethImages'
import { parseImages } from './utils'

export default {
  networks: {
    1: {
      name: 'Ethereum Mainnet',
      node: '',
      images: ethImages
    },
    31: {
      name: 'RSK Testnet',
      node: 'https://public-node.testnet.rsk.co:443',
      images: parseImages(rskTestnetImages)
    }
  }
}
