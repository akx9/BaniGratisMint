import React, { useEffect, useState } from 'react';
import { contractAddressNFT, gasLimit, priceFor1NFT, tokenNonce } from 'config';
import { useGetTotalSupply } from './Actions/helpers';
import { refreshAccount, sendTransactions } from '../../../helpers';
import goldImage from '../../../assets/img/gold.jpg';

export const TopInfo = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const getTotalSupply = useGetTotalSupply();
  const [remainingTokens, setRemainingTokens] = useState(0);
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
    string | null
  >(null);

  const decreaseSliderValue = () => {
    setSliderValue((prevValue) => Math.max(prevValue - 1, 1));
  };

  const increaseSliderValue = () => {
    setSliderValue((prevValue) => Math.min(prevValue + 1, 10));
  };

  const setTokensStatus = async () => {
    const tokensStatus = await getTotalSupply();

    setRemainingTokens(750 - Number(tokensStatus));
  }

  useEffect(() => {
    setTokensStatus();
  }, []);

  const mintedWidth = `${sliderValue * 10}%`;
  const remainingWidth = `${100 - sliderValue * 10}%`;

  const mintNFT = async () => {

    let mintAmount = sliderValue.toString(16);
    let transactionValue = priceFor1NFT * sliderValue;

    const dataForMint = 'mint' +
      '@0' + mintAmount +
      '@' + tokenNonce;

    const mintNFTTransaction = {
      value: transactionValue,
      data: dataForMint,
      receiver: contractAddressNFT,
      gasLimit: gasLimit
    };

    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: mintNFTTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Mint transaction',
        errorMessage: 'An error has occurred during Mint',
        successMessage: 'Mint transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return (
      <div className='wrapper2'>
        <div className='contentWrapper'>
          <img src={goldImage} className='imageWrapper' alt='Gold' />
          <div className='textWrapper'>
            <h1 className='title'>Gold Pass</h1>
            <h2 className='subtitle'>The Gateway to Unique Benefits and Features</h2>
            <p className='imageDescription'>
              This is the only collection that can be purchased directly. Minting a "Gold" NFT, gets you free lifetime access to our Discord group. Holding a "Gold" NFT represents not only an investment but also a direct contribution to the treasury of BaniDAO, thus enabling the core idea of the project. The "Gold" NFTs play an essential role in obtaining the Diamond Pass, granting you access to the DAO Council and providing voting rights and a share of the treasury.
            </p>
            <div className='mint-progress'>
            <div className='mint-label'>{sliderValue}</div>
            <div className='progress-bar'>
              <div className='minted' style={{ width: mintedWidth }}></div>
            </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
                <button onClick={decreaseSliderValue} className="incrementButton">-</button>
                <button onClick={increaseSliderValue} className="incrementButton">+</button>
              </div>
              <br></br>
              <div className='total-supply'>Tokens Left: {remainingTokens}</div>
            </div>
            <div className='buttonsWrapper'>
              <button type='button' className='mintButton' onClick={mintNFT}>
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>

  );
};
