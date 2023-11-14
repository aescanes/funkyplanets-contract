const SmartContract = artifacts.require("FunkyPlanets");

module.exports = function (deployer) {
  deployer.deploy(SmartContract, "FunkyPlanets", "FPS", "https://ipfs.io/ipfs/QmUxFdTQsLWjJGbNga2BLPLz3MGw3V8VFFvEW3NZqaiiVH/");
};
