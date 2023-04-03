import Web3 from 'web3';
import { nftContractAddress, nftContractABI} from './contractConfig.js';
import { setupEventListeners } from './eventListeners.js';
import { getNFTLevel } from './nftLevel.js';
// この関数は、ユーザーが作品を読む、編集、コメント、いいねなどのアクションを実行したときにトリガーされるイベントリスナーを設定する
function setupEventListeners() {
    // 以下のコードは、実際のイベントリスナーの設定方法の例です
    // 読書イベントのリスナー
    document.addEventListener('read', () => {
      rewardTokens('read');
    });

    // 添削イベントのリスナー
    document.addEventListener('review', () => {
      rewardTokens('review');
    });

    // コメントイベントのリスナー
    document.addEventListener('comment', () => {
      rewardTokens('comment');
    });

    // いいねイベントのリスナー
    document.addEventListener('like', () => {
      rewardTokens('like');
    });
  
    // 他のアクションに対するイベントリスナーも同様に設定
  }
  

  async function rewardTokens(action) {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
  
      // 報酬として与えられるトークンの量を指定します。
      let tokenAmount;
      switch (action) {
        case 'read':
          tokenAmount = 1;
          break;
        case 'review':
          tokenAmount = 2;
          break;
        case 'comment':
          tokenAmount = 3;
          break;
        case 'like':
          tokenAmount = 4;
          break;
        default:
          throw new Error('Invalid action');
      }
  
      // スマートコントラクトに報酬トークンをリクエストする。
      await contract.methods.rewardTokens(account, tokenAmount).send({ from: account });
      console.log(`Tokens rewarded for ${action} action`);
    } catch (error) {
      console.error(`Failed to reward tokens for ${action} action:`, error);
    }
  }
  
  setupEventListeners();

  // イーサリアムプロバイダーとWeb3インスタンスの設定
  const web3 = new Web3(window.ethereum);


  // NFTスマートコントラクトのインスタンス
const nftContract = new web3.eth.Contract(nftContractABI, nftContractAddress);

// トークンスマートコントラクトのインスタンス
const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
  
  // スマートコントラクトのインスタンスを作成
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  
  async function getNFTBalance(address) {
    try {
      const balance = await nftContract.methods.balanceOf(address).call();
      return balance;
    } catch (error) {
      console.error("Failed to get NFT balance:", error);
      return 0;
    }
  }
  
  async function getTokenBalance(address) {
    try {
      const balance = await tokenContract.methods.getTokenBalance(address).call();
      return balance;
    } catch (error) {
      console.error("Failed to get token balance:", error);
      return 0;
    }
  }
  
  async function buyNFT() {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const price = 1; // NFTの価格（トークン）
  
      await tokenContract.methods.buyNFT().send({ from: account, value: price });
      console.log("NFT purchased successfully");
    } catch (error) {
      console.error("Failed to buy NFT:", error);
    }
  }
  
  async function sendTokens(receiverAddress, amount) {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
  
      await tokenContract.methods.sendTokens(receiverAddress, amount).send({ from: account });
      console.log("Tokens sent successfully");
    } catch (error) {
      console.error("Failed to send tokens:", error);
    }
  }
  
  (async () => {
    // イベントリスナーの設定
    await setupEventListeners();
  })();