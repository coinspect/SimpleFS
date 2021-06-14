
import images from './images'
import { getGithubUrl, parseURL } from './utils'
const githubUrl = getGithubUrl(process.env.VUE_APP_REPO)
export default {
  githubUrl,
  networks: {
    1: {
      name: 'Ethereum Mainnet',
      node: parseURL('https://mainnet.infura.io/v3/21c1e0ed1fb24871a0bffad1e4ae341f'),
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
