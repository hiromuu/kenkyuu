const NarouToken = artifacts.require("NarouToken");

module.exports = function (deployer) {
  deployer.deploy(NarouToken);
};