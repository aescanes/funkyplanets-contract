# Funky Planets ERC721 NFT contract

At the time this NFT collection was created, NASA had 4525 exoplanets registered. This collection is the funky version of them. All planets were randomly and algorithmically generated with different traits like background, shape, rings, life, level of technological advancement, etc. Some planets will have satellites, water and even cities.

You now can be the owner of your own planet with its information. Each planet also counts with the QR code to read its information.

## NFT contract (solidity)

### Files (contracts)

* contracts/Migrations.sol
* contracts/FunkyPlanets.sol

## NFT contract deploy process (javascript)

### Files (migrations)

* migrations/1_initial_migration.js
* migrations/2_smart_contract_migration.js

### Check Solidity Security and Style Guide validations (solhint)
https://github.com/protofire/solhint
```bash
solhint contracts/FunkyPlanets.sol
```

## test contract
```bash
truffle test
```

## Deploy using truffle

```bash
truffle init

truffle compile

truffle migrate --network <network_name>
```