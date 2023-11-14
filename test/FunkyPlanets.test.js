const FunkyPlanets = artifacts.require('FunkyPlanets');
const expect = require('chai').expect;

contract('Funky Planets ERC721 token tests', async accounts => {
    [alice, bob] = accounts;
    const tokenName = 'FunkyPlanets';
    const tokenSymbol = 'FPS';
    const tokenBaseURI = 'https://ipfs.io/ipfs/<ipfs_metadata_hash>/';
    const tokenMaxSupply = 4525;
    const tokenBaseExtension = '.json';
    const tokenMaxMintAmount = 20;
    const tokenReservedPlanetsForTeam = 50;
    const tokenInicialEtherValue = '0.05';
    const tokenInicialEtherValueWei = '50000000000000000';

    let FunkyPlanetsInstance;
    beforeEach(async () => {
        FunkyPlanetsInstance = await FunkyPlanets.new(tokenName, tokenSymbol, tokenBaseURI)
    });

    context('Constructor', async () => {
        it('Init baseURI should be ' + tokenBaseURI, async () => {
            const baseURI = await FunkyPlanetsInstance.baseURI();
            expect(baseURI).to.equal(tokenBaseURI);
        });

        it('Init PLANET_PROVENANCE should be empty', async () => {
            const PLANET_PROVENANCE = await FunkyPlanetsInstance.PLANET_PROVENANCE();
            expect(PLANET_PROVENANCE).empty;
        });

        it('Init maxSupply should be ' + tokenMaxSupply, async () => {
            const maxSupply = await FunkyPlanetsInstance.maxSupply();
            expect(maxSupply.toNumber()).to.equal(tokenMaxSupply);
        });

        it('Init maxMintAmount should be ' + tokenMaxMintAmount, async () => {
            const maxMintAmount = await FunkyPlanetsInstance.maxMintAmount();
            expect(maxMintAmount.toNumber()).to.equal(tokenMaxMintAmount);
        });

        it('Init reservedPlanetsForTeam should be ' + tokenReservedPlanetsForTeam, async () => {
            const reservedPlanetsForTeam = await FunkyPlanetsInstance.reservedPlanetsForTeam();
            expect(reservedPlanetsForTeam.toNumber()).to.equal(tokenReservedPlanetsForTeam);
        });

        it('Init saleIsActive should be true', async () => {
            const saleIsActive = await FunkyPlanetsInstance.saleIsActive();
            expect(saleIsActive).to.equal(true);
        });

        it('Init _name should be ' + tokenName, async () => {
            const name = await FunkyPlanetsInstance.name();
            expect(name).to.equal(tokenName);
        });

        it('Init _symbol should be ' + tokenSymbol, async () => {
            const symbol = await FunkyPlanetsInstance.symbol();
            expect(symbol).to.equal(tokenSymbol);
        });

        it('Init totalSupply should be 0', async () => {
            const totalSupply = await FunkyPlanetsInstance.totalSupply();
            expect(totalSupply.toNumber()).to.equal(0);
        });

        it('Init baseExtension should be ' + tokenBaseExtension, async () => {
            const baseExtension = await FunkyPlanetsInstance.baseExtension();
            expect(baseExtension).to.equal(tokenBaseExtension);
        });
    });

    context('Methods', async () => {
        it('setProvenanceHash onwer', async () => {
            const newProvenance = 'testProvenanceHash';

            const provenanceBefore = await FunkyPlanetsInstance.PLANET_PROVENANCE();
            expect(provenanceBefore).empty;
            await FunkyPlanetsInstance.setProvenanceHash(newProvenance);
            const provenanceAfter = await FunkyPlanetsInstance.PLANET_PROVENANCE();
            expect(provenanceAfter).to.equal(newProvenance);
        })

        it('setProvenanceHash nonowner', async () => {
            try {
                const result = await FunkyPlanetsInstance.setProvenanceHash('test', { from: bob });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
            }
        })

        it('setmaxMintAmount onwer', async () => {
            const newMaxMintAmount = 25;

            const maxMintAmountBefore = await FunkyPlanetsInstance.maxMintAmount();
            expect(maxMintAmountBefore.toNumber()).to.equal(tokenMaxMintAmount);
            await FunkyPlanetsInstance.setmaxMintAmount(newMaxMintAmount);
            const maxMintAmountAfter = await FunkyPlanetsInstance.maxMintAmount();
            expect(maxMintAmountAfter.toNumber()).to.equal(newMaxMintAmount);
        })

        it('setmaxMintAmount nonowner', async () => {
            try {
                const result = await FunkyPlanetsInstance.setmaxMintAmount(30, { from: bob });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
            }
        })

        it('setBaseURI onwer', async () => {
            const newBaseURI = 'https://ipfs.io/ipfs/<ipfs_metadata_hash_2>/';

            const baseURIBefore = await FunkyPlanetsInstance.baseURI();
            expect(baseURIBefore).to.equal(tokenBaseURI);
            await FunkyPlanetsInstance.setBaseURI(newBaseURI);
            const baseURIAfter = await FunkyPlanetsInstance.baseURI();
            expect(baseURIAfter).to.equal(newBaseURI);
        })

        it('setBaseURI nonowner', async () => {
            try {
                const result = await FunkyPlanetsInstance.setBaseURI('test', { from: bob });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
            }
        })

        it('setBaseExtension onwer', async () => {
            const newBaseExtension = '.json2';

            const baseExtensionBefore = await FunkyPlanetsInstance.baseExtension();
            expect(baseExtensionBefore).to.equal(tokenBaseExtension);
            await FunkyPlanetsInstance.setBaseExtension(newBaseExtension);
            const baseExtensionAfter = await FunkyPlanetsInstance.baseExtension();
            expect(baseExtensionAfter).to.equal(newBaseExtension);
        })

        it('setBaseExtension nonowner', async () => {
            try {
                const result = await FunkyPlanetsInstance.setBaseExtension('test', { from: bob });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
            }
        })

        it('flipSaleState onwer', async () => {
            const saleIsActiveBefore = await FunkyPlanetsInstance.saleIsActive();
            expect(saleIsActiveBefore).to.equal(true);
            await FunkyPlanetsInstance.flipSaleState();
            const saleIsActiveAfter = await FunkyPlanetsInstance.saleIsActive();
            expect(saleIsActiveAfter).to.equal(false);
        })

        it('flipSaleState nonowner', async () => {
            try {
                const result = await FunkyPlanetsInstance.flipSaleState({ from: bob });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
            }
        })

        it('getCostToMint', async () => {
            const cost = await FunkyPlanetsInstance.getCostToMint();
            expect(cost.toString()).to.equal(tokenInicialEtherValueWei);
        })

        it('walletOfOwner', async () => {
            const walletBefore = await FunkyPlanetsInstance.walletOfOwner(bob);
            expect(walletBefore).to.empty;
            await FunkyPlanetsInstance.mint(1, {
                from: alice,
                value: web3.utils.toWei(tokenInicialEtherValue, "ether"),
            });
            const walletAfterBob = await FunkyPlanetsInstance.walletOfOwner(bob);
            expect(walletAfterBob).to.empty;
            const walletAfterAlice = await FunkyPlanetsInstance.walletOfOwner(alice);
            expect(walletAfterAlice[0].toNumber()).to.equal(1);
            expect(walletAfterAlice.length).to.equal(1);
        });

        it('tokenURI with token', async () => {
            await FunkyPlanetsInstance.mint(1, {
                from: alice,
                value: web3.utils.toWei(tokenInicialEtherValue, "ether"),
            });
            const token = await FunkyPlanetsInstance.tokenURI(1);
            expect(token).to.equal(tokenBaseURI + '1' + tokenBaseExtension);
        });

        it('tokenURI without token', async () => {
            try {
                const result = await FunkyPlanetsInstance.tokenURI(1);
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.toString()).to.equal('Error: Returned error: VM Exception while processing transaction: revert ERC721Metadata: URI query for nonexistent token');
            }
        });

        it('withdraw onwer', async () => {
            await FunkyPlanetsInstance.mint(1, {
                from: bob,
                value: web3.utils.toWei(tokenInicialEtherValue, "ether"),
            });
            const balanceBefore = await web3.eth.getBalance(FunkyPlanetsInstance.address);
            expect(balanceBefore).to.equal(tokenInicialEtherValueWei);
            await FunkyPlanetsInstance.withdraw();
            const balanceAfter = await web3.eth.getBalance(FunkyPlanetsInstance.address);
            expect(balanceAfter).to.equal('0');
        })

        it('withdraw nonowner', async () => {
            try {
                const result = await FunkyPlanetsInstance.withdraw({ from: bob });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
            }
        })

    });

    context('Mint', async () => {
        it('mint', async () => {
            const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
            expect(totalSupplyBefore.toNumber()).to.equal(0);
            await FunkyPlanetsInstance.mint(1, {
                from: bob,
                value: web3.utils.toWei(tokenInicialEtherValue, "ether"),
            });
            const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
            expect(totalSupplyAfter.toNumber()).to.equal(1);
        });

        it('mint sending wrong amount of gas', async () => {
            try {
                const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyBefore.toNumber()).to.equal(0);
                const result = await FunkyPlanetsInstance.mint(1, {
                    from: bob,
                    value: web3.utils.toWei("0.03", "ether"),
                });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ether value sent is not correct, check getCostToMint function to get the individual price');
                const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyAfter.toNumber()).to.equal(0);
            }
        });

        it('mint with salesIsActive equal false', async () => {
            try {
                const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyBefore.toNumber()).to.equal(0);
                await FunkyPlanetsInstance.flipSaleState();
                const result = await FunkyPlanetsInstance.mint(1, {
                    from: bob,
                    value: web3.utils.toWei(tokenInicialEtherValue, "ether"),
                });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Sale is not active');
                const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyAfter.toNumber()).to.equal(0);
            }
        });

        it('mint with wrong maxMintAmount', async () => {
            try {
                const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyBefore.toNumber()).to.equal(0);
                const result = await FunkyPlanetsInstance.mint(21, {
                    from: bob,
                    value: web3.utils.toWei(tokenInicialEtherValue, "ether"),
                });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Can only mint the maxMintAmount tokens at a time');
                const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyAfter.toNumber()).to.equal(0);
            }
        });

        it('mintReservedPlanets', async () => {
            const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
            expect(totalSupplyBefore.toNumber()).to.equal(0);
            const reservedPlanetsForTeamBefore = await FunkyPlanetsInstance.reservedPlanetsForTeam();
            expect(reservedPlanetsForTeamBefore.toNumber()).to.equal(tokenReservedPlanetsForTeam);
            await FunkyPlanetsInstance.mintReservedPlanets(bob, 1, {
                from: alice
            });
            const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
            expect(totalSupplyAfter.toNumber()).to.equal(1);
            const reservedPlanetsForTeamAfter = await FunkyPlanetsInstance.reservedPlanetsForTeam();
            expect(reservedPlanetsForTeamAfter.toNumber()).to.equal(tokenReservedPlanetsForTeam - 1);
        });

        it('mintReservedPlanets with salesIsActive equal false', async () => {
            try {
                const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyBefore.toNumber()).to.equal(0);
                const reservedPlanetsForTeamBefore = await FunkyPlanetsInstance.reservedPlanetsForTeam();
                expect(reservedPlanetsForTeamBefore.toNumber()).to.equal(tokenReservedPlanetsForTeam);
                await FunkyPlanetsInstance.flipSaleState();
                const result = await FunkyPlanetsInstance.mintReservedPlanets(bob, 1, {
                    from: alice
                });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Sale is not active');
                const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyAfter.toNumber()).to.equal(0);
                const reservedPlanetsForTeamAfter = await FunkyPlanetsInstance.reservedPlanetsForTeam();
                expect(reservedPlanetsForTeamAfter.toNumber()).to.equal(tokenReservedPlanetsForTeam);
            }
        });

        it('mintReservedPlanets with wrong maxMintAmount', async () => {
            try {
                const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyBefore.toNumber()).to.equal(0);
                const reservedPlanetsForTeamBefore = await FunkyPlanetsInstance.reservedPlanetsForTeam();
                expect(reservedPlanetsForTeamBefore.toNumber()).to.equal(tokenReservedPlanetsForTeam);
                const result = await FunkyPlanetsInstance.mintReservedPlanets(bob, 21, {
                    from: alice
                });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Can only mint the maxMintAmount tokens at a time');
                const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyAfter.toNumber()).to.equal(0);
                const reservedPlanetsForTeamAfter = await FunkyPlanetsInstance.reservedPlanetsForTeam();
                expect(reservedPlanetsForTeamAfter.toNumber()).to.equal(tokenReservedPlanetsForTeam);
            }
        });

        it('mintReservedPlanets nonowner', async () => {
            try {
                const totalSupplyBefore = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyBefore.toNumber()).to.equal(0);
                const reservedPlanetsForTeamBefore = await FunkyPlanetsInstance.reservedPlanetsForTeam();
                expect(reservedPlanetsForTeamBefore.toNumber()).to.equal(tokenReservedPlanetsForTeam);
                const result = await FunkyPlanetsInstance.mintReservedPlanets(bob, 1, {
                    from: bob
                });
                expect(result.receipt.status).to.equal(false);
            } catch (error) {
                expect(error.reason).to.equal('Ownable: caller is not the owner');
                const totalSupplyAfter = await FunkyPlanetsInstance.totalSupply();
                expect(totalSupplyAfter.toNumber()).to.equal(0);
                const reservedPlanetsForTeamAfter = await FunkyPlanetsInstance.reservedPlanetsForTeam();
                expect(reservedPlanetsForTeamAfter.toNumber()).to.equal(tokenReservedPlanetsForTeam);
            }
        });
    });
});