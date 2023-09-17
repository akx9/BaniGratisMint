import { AbiRegistry, SmartContract, Address } from '@multiversx/sdk-core/out';
import { contractAddress, contractAddressNFT } from 'config';
import pingPongJson from 'ping-pong.abi.json';
import nftJson from 'elven-tools-sft-minter.abi.json';

const abiPingPong = AbiRegistry.create(pingPongJson);
const abiNFT = AbiRegistry.create(nftJson);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi: abiPingPong
});

export const smartContractNFT = new SmartContract({
  address: new Address(contractAddressNFT),
  abi: abiNFT
});
