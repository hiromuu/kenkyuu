import Web3 from 'web3';
import { getNFTLevel } from './nftLevel.js';
import {tokenContractAddress, tokenContractABI } from './contractConfig.js';

const web3 = new Web3(window.ethereum);
const contractAddress = tokenContractAddress;
const contractABI = tokenContractABI;
const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function rewardTokens(action) {
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const nftLevel = await getNFTLevel(account);

    let tokenAmount;
    switch (action) {
      case 'read':
        tokenAmount = nftLevel;
        break;
       // 他のアクションも同様に設定
       default:
        throw new Error('Invalid action');
    }

    await contract.methods.rewardTokens(account, tokenAmount).send({ from: account });
    return tokenAmount;
  } catch (error) {
    console.error(`Failed to reward tokens for ${action} action:`, error);
    return 0;
  }
}