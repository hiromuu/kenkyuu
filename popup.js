document.addEventListener("DOMContentLoaded", async () => {
    // Firebaseの初期化
    const firebaseConfig = {
      apiKey: "AIzaSyB4dzdHTOeF16EiF26w13Z1SNDa7BJpUMQ",
      authDomain: "kenkyuu-c37de.firebaseapp.com",
      projectId: "kenkyuu-c37de",
      storageBucket: "kenkyuu-c37de.appspot.com",
      messagingSenderId: "410712409466",
      appId: "1:410712409466:web:122b018efdc57fecf882c3",
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
  