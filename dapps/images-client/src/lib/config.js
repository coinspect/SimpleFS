
import images from './images'

export default {
  networks: {
    1: {
      name: 'Ethereum Mainnet',
      node: '',
      images: images.ethMainnet,
      explorer: 'https://etherscan.io'
    },
    3: {
      name: 'Ethereum Ropsten',
      node: '',
      images: images.ethRopsten,
      explorer: 'https://ropsten.etherscan.io'
    },
    30: {
      name: 'RSK Mainnet',
      node: 'https://public-node.rsk.co:443',
      images: images.rskMainnet,
      explorer: 'https://explorer.rsk.co'
    },
    31: {
      name: 'RSK Testnet',
      node: 'https://public-node.testnet.rsk.co:443',
      images: images.rskTestnet,
      explorer: 'https://explorer.testnet.rsk.co'
    }
  }
}
