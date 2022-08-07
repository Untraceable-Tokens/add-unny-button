const tokenAddress = "0x18bcd15623c1D27FfFd931A429F392d19599BCA5";
const tokenSymbol = "UNNY";
const tokenDecimals = 18;
const tokenImage = "./assets/unny_coin.png";
const chainId = "137";

async function addTokenFunction() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
    try {
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("UNNY Coin has not been added");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      alert("Please add the Polygon network to your wallet first.");
    } else {
      alert(switchError);
    }
  }
}

async function addPolygonFunction() {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainId,
              chainName: "Polygon",
              rpcUrls: [
                "https://polygon-rpc.com",
                "https://rpc-mainnet.maticvigil.com",
                "https://rpc.ankr.com/polygon",
              ],
              blockExplorerUrls: [
                "https://polygonscan.com",
                "https://polygon.etherscan.io",
                "https://mainnet.maticvigil.com/",
                "https://explorer.ankr.com/polygon",
              ],
            },
          ],
        });
      } catch (addError) {
        alert(addError);
      }
    } else {
      alert(switchError);
      // handle other "switch" errors
    }
  }
}
