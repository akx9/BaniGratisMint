import React, { useEffect, useState } from 'react';
import { contractAddressNFT, gasLimit, priceFor1NFT, tokenNonce } from 'config';
import { useGetTotalSupply } from './helpers';
import { refreshAccount, sendTransactions } from '../../../helpers';
import goldImage from '../../../assets/img/gold.jpg';

export const TopInfo = () => {
  const [sliderValue, setSliderValue] = useState(1);
  const getTotalSupply = useGetTotalSupply();
  const [disableMintButton, setDisableMintButton] = useState(false);
  const [remainingTokens, setRemainingTokens] = useState(0);
  const /*transactionSessionId*/[, setTransactionSessionId] = useState<
    string | null
  >(null);
  const MINUTE_MS = 12000;


  const decreaseSliderValue = () => {
    setSliderValue((prevValue) => Math.max(prevValue - 1, 1));
  };

  const increaseSliderValue = () => {
    setSliderValue((prevValue) => Math.min(prevValue + 1, 10));
  };

  const setTokensStatus = async () => {
    const tokensStatus = await getTotalSupply();

    setRemainingTokens(750 - Number(tokensStatus));

    if(Number(tokensStatus) == 427) {
      setDisableMintButton(true);
    }
  }

  //call the set token status method every minute, such that tokens left - refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setTokensStatus();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  useEffect(() => {
    setTokensStatus();
  }, []);

  const mintedWidth = `${sliderValue * 10}%`;
  const remainingWidth = `${100 - sliderValue * 10}%`;

  const mintNFT = async () => {

    let mintAmount = sliderValue.toString(16);
    let transactionValue = priceFor1NFT * sliderValue;

    const dataForMint = 'buy' +
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
      redirectAfterSign: false,
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
      await setTokensStatus();
    }
  };

  return (
    <div className="section">
        <div className='contentWrapper'>
          <div className='imageWrapper'>
            <img src={goldImage} alt='Gold' style={{ width: '100%', borderRadius: '30px' }} />
          </div>
          <div className='textWrapper'>
            <h1 className='title'>Gold Pass</h1>
            <h2 className='subtitle'>The Gateway to Unique Benefits and Features</h2>
            <p className='imageDescription'>
              This is the only collection, created by the Bani Gratis community, that can be purchased directly. Minting a “Gold” NFT gets you lifetime access to our Discord group. Holding a “Gold” NFT is not only an investment, but also a direct contribution to BaniDAO. Owning 5 “Gold” NFTs will enable you to swap them for a “Diamond” NFT, which gives you access to our DAO Council and thus, provide voting rights and a share of our treasury.

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
              <button type='button' className='mintButton' onClick={mintNFT} disabled={disableMintButton}>
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};