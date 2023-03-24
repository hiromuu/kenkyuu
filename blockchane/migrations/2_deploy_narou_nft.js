const NarouNFT = artifacts.require("NarouNFT");
const NarouToken = artifacts.require("NarouToken");

module.exports = async function (deployer) {
  await deployer.deploy(NarouToken);
  const narouToken = await NarouToken.deployed();

  await deployer.deploy(NarouNFT, narouToken.address);
};