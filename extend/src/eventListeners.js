import Web3 from 'web3';
import { rewardTokens } from './rewardTokens.js';
import { nftContractAddress, nftContractABI, tokenContractAddress, tokenContractABI } from './contractConfig.js';

const web3 = new Web3(window.ethereum);
const contractAddress = process.env.contractAddress;
const contractABI = process.env.contractABI;
const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function setupEventListeners() {
  const targetNode = document.querySelector('#novel_contents'); // 小説のコンテンツ要素を指定

  if (targetNode) {
    const observer = new MutationObserver(async () => {
      const tokensForReading = await rewardTokens('read');
      console.log(`Rewarded ${tokensForReading} tokens for reading.`);
    });

    observer.observe(targetNode, { childList: true, subtree: true });
  }
}