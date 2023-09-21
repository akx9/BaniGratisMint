import * as React from 'react';
import { FormatAmount } from 'components';
import { contractAddress } from 'config';
import { useGetAccountInfo } from 'hooks';
import { useState, useEffect, useRef } from "react";

export const TopInfo = () => {
  const { address, account } = useGetAccountInfo();
  const [sliderValue, setSliderValue] = useState(1);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const sliderPercentage = `${((Number(slider.value) - 1) * 100 / 9)}%`;
      slider.style.background = `linear-gradient(90deg, #fd7e14 ${sliderPercentage}, #d3d3d3 ${sliderPercentage})`;
    }
  }, [sliderValue]);

  return (
    <div className='wrapper2'>
                <div className='contentWrapper'>
                    <div className='imageWrapper' />
                    <div className='textWrapper'>
                        <h1 className='title'>Gold Pass</h1>
                        <h2 className='subtitle'>The Gateway to Unique Benefits and Features</h2>
                        <p className='imageDescription'>This is the only collection that can be purchased directly. Minting a "Gold" NFT, gets you free lifetime access to our Discord group.
                            Holding a "Gold" NFT represents not only an investment but also a direct contribution to the treasury of BaniDAO, thus enabling the core idea of the project.
                            The "Gold" NFTs play an essential role in obtaining the Diamond Pass, granting you access to the DAO Council and providing voting rights and a share of the treasury.</p>
                        <br></br>
                        <div className='sliderContainer'>
                        <div style={{fontWeight: "bold", fontSize: "1.8rem", marginBottom: "10px"}}> {sliderValue}</div>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={sliderValue}
                                className='slider'
                                id="myRange"
                                ref={sliderRef}
                                onChange={e => {
                                    setSliderValue(Number(e.target.value));
                                    const slider = e.target as HTMLInputElement;
                                    const sliderPercentage = `${((Number(slider.value) - 1) * 100 / 9)}%`;
                                    slider.style.background = `linear-gradient(90deg, #fd7e14 ${sliderPercentage}, #d3d3d3 ${sliderPercentage})`;
                                }}
                            />


                        <div className='buttonsWrapper'>
                            <button type="button" className='button'>Mint</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};
