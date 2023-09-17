import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import BigNumber from 'bignumber.js';

import { useGetNetworkConfig } from 'hooks';
import { smartContractNFT } from './smartContract';
const resultsParser = new ResultsParser();

export const useGetTotalSupply = () => {
  const { network } = useGetNetworkConfig();
  const [totalSupply, setTotalSupply] = useState<string>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getTotalSupply = async () => {
    try {
      const query = smartContractNFT.createQuery({
        func: new ContractFunction('getTotalSupply')
      });
      const queryResponse = await proxy.queryContract(query);
      const resultBuff = queryResponse.getReturnDataParts()?.[0]?.toString('hex');
      const result = new BigNumber(resultBuff, 16).toString(10);
      console.log(result)
      setTotalSupply(result);
    } catch (err) {
      console.error('Unable to call getTotalSupply', err);
    }
  };

  useEffect(() => {
    getTotalSupply();
  }, []);

  return totalSupply;
};
