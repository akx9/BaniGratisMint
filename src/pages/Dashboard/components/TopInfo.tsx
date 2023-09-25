import React, { useState } from 'react';
import { FormatAmount } from 'components';
import { contractAddress } from 'config';
import { useGetAccountInfo } from 'hooks';

export const TopInfo = () => {
  const { address, account } = useGetAccountInfo();
  const [sliderValue, setSliderValue] = useState(5);

  const decreaseSliderValue = () => {
    setSliderValue((prevValue) => Math.max(prevValue - 1, 1));
  };

  const increaseSliderValue = () => {
    setSliderValue((prevValue) => Math.min(prevValue + 1, 10));
  };

  const mintedWidth = `${sliderValue * 10}%`;
  const remainingWidth = `${100 - sliderValue * 10}%`;

  return (
      <div className='wrapper2'>
        <div className='contentWrapper'>
          <div className='imageWrapper' />
          <div className='textWrapper'>
            <h1 className='title'>Gold Pass</h1>
            <h2 className='subtitle'>The Gateway to Unique Benefits and Features</h2>
            <p className='imageDescription'>
              This is the only collection that can be purchased directly. Minting a "Gold" NFT, gets you free lifetime access to our Discord group. Holding a "Gold" NFT represents not only an investment but also a direct contribution to the treasury of BaniDAO, thus enabling the core idea of the project. The "Gold" NFTs play an essential role in obtaining the Diamond Pass, granting you access to the DAO Council and providing voting rights and a share of the treasury.
            </p>
            <div className='mint-progress'>
              <div className='mint-label'>Minting Progress</div>
              <div className='progress-bar'>
                <div className='minted' style={{ width: mintedWidth }}>{sliderValue}</div>
                <div className='remaining' style={{ width: remainingWidth }}></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
                <button onClick={decreaseSliderValue} className="incrementButton">-</button>
                <button onClick={increaseSliderValue} className="incrementButton">+</button>
              </div>
            </div>
            <div className='buttonsWrapper'>
              <button type='button' className='mintButton'>
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>

  );
};
