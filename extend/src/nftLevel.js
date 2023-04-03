// 必要なインポートを追加
import Web3 from 'web3';
import { nftContractAddress, nftContractABI} from './contractConfig.js';

// イーサリアムプロバイダーとWeb3インスタンスの設定
const web3 = new Web3(window.ethereum);


// スマートコントラクトのインスタンスを作成
const contract = new web3.eth.Contract(nftContractABI, nftContractAddress,);

export async function getNFTLevel(address) {
  // ここでユーザーのNFTのレベルを取得します。
  // 例えば、NFTのトークンIDに基づいてレベルを計算する場合:
  const nftTokenId = await contract.methods.tokenOfOwnerByIndex(address, 0).call();
  return nftTokenId % 3 + 1;
}