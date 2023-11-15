import {ethers} from "hardhat";

const { task } = require('hardhat/config');
const fs = require('fs');

task('generate-abis', 'Generate contract ABIs')
    .setAction(async () => {
        const contracts = await ethers.getContractFactory('PresaleV2'); // Replace 'YourContract' with the actual contract name
        const contractAbi = JSON.stringify(contracts.interface.format('json'), null, 2);

        fs.writeFileSync('abis/PresaleV2.json', contractAbi); // Save the ABI to a file
    });
