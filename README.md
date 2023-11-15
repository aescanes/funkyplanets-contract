# Funky Planets ERC721 NFT Contract

Unlock the cosmos with the Funky Planets NFT collection, a whimsical take on the 4525 registered exoplanets identified by NASA. Each planet in this collection is a unique creation, algorithmically generated with distinct traits like background, shape, rings, life, and technological advancement. Some planets even come complete with satellites, water bodies, and bustling cities.

## Table of Contents

- [Dependencies](#dependencies)
- [NFT Contract (Solidity)](#nft-contract-solidity)
  - [Files](#files)
- [NFT Contract Deployment Process](#nft-contract-deployment-process)
  - [Migration Files](#migration-files)
  - [Solidity Security and Style Guide Validations](#solidity-security-and-style-guide-validations)
- [Test Contract](#test-contract)
- [Deploy Using Truffle](#deploy-using-truffle)
- [Scripts](#scripts)

## Dependencies
Make sure you have the following dependencies installed:

* Node.js and npm: [Download and Install Node.js and npm](https://nodejs.org/)
* Solhint: Install Solhint globally to lint your Solidity code.

```bash
npm install -g solhint
``````
* Ganache: [Download and Install Ganache](https://trufflesuite.com/ganache/) for local blockchain development.

## NFT ERC721 Contracts (Solidity)

### Files

- `contracts/Migrations.sol`
- `contracts/FunkyPlanets.sol`

Explore the solidity contracts that power the Funky Planets NFT collection.

## NFT Contract Deployment Process

### Migration Files

Follow these migration scripts to deploy the Funky Planets NFT contract using JavaScript.

- `migrations/1_initial_migration.js`
- `migrations/2_smart_contract_migration.js`

### Solidity Security and Style Guide Validations

Make sure your contract adheres to best practices with [Solhint](https://github.com/protofire/solhint).

```bash
solhint contracts/FunkyPlanets.sol
```

### Test Contract
Ensure the contract functionality with Truffle's testing suite.
```bash
truffle test
```

### Deploy Using Truffle
Initialize, compile, and migrate the contract to your desired network.
```bash
truffle init

truffle compile

truffle migrate --network <network_name>
```

### Scripts
Make your development process smoother with these npm script commands:

* Compile Contracts:
```bash
npm run compile
```

* Migrate Contracts::
```bash
npm run migrate
```

* Deploy to Specific Network:
```bash
npm run deploy --network <network_name>
```