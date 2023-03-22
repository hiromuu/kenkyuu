document.addEventListener("DOMContentLoaded", async () => {
    // Firebaseの初期化
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
    };
    firebase.initializeApp(firebaseConfig);
  
    const nftBalanceElement = document.getElementById("nft-balance");
    const tokenBalanceElement = document.getElementById("token-balance");
    const buyNFTButton = document.getElementById("buy-nft");
    const sendTokensButton = document.getElementById("send-tokens");
    const refreshButton = document.getElementById("refresh");
  
    // 残高の更新
    async function updateBalances() {
      const address = "0xYourAddress"; // ユーザーのアドレス
      const nftBalance = await getNFTBalance(address);
      const tokenBalance = await getTokenBalance(address);
      nftBalanceElement.textContent = nftBalance;
      tokenBalanceElement.textContent = tokenBalance;
    }
  
    // NFT購入
    buyNFTButton.addEventListener("click", async () => {
      await buyNFT();
      updateBalances();
    });
  
    // トークン送信
    sendTokensButton.addEventListener("click", async () => {
      const receiverAddress = "0xReceiverAddress"; // 受信者のアドレス
      const amount = 10; // 送信するトークンの量
      await sendTokens(receiverAddress, amount);
      updateBalances();
    });
  
    // 残高更新ボタン
    refreshButton.addEventListener("click", updateBalances);
  
    // 初期残高の取得
    updateBalances();
  });
  