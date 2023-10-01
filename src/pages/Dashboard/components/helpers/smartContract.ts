import { AbiRegistry, SmartContract, Address } from '@multiversx/sdk-core/out';
import { contractAddressNFT } from 'config';
import nftJson from 'elven-tools-sft-minter.abi.json';

const abiNFT = AbiRegistry.create(nftJson);

export const smartContractNFT = new SmartContract({
  address: new Address(contractAddressNFT),
  abi: abiNFT
});
