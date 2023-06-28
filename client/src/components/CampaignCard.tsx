import { BigNumber, ethers } from 'ethers'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

type Props = {
    campaignCreator: string,
    campaignName: string,
    campaignDescription: string,
    fundraisingGoal: BigNumber,
    currentFundsRaised: BigNumber,
    mediaContent: string,
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const CampaignCard = ( { campaignCreator, campaignName, campaignDescription, fundraisingGoal, currentFundsRaised, mediaContent, onClick }: Props): JSX.Element => {
  return (
    <div className='sm:w-[288px] w-full rounded-[15px] bg-[#CED4DA] p-2 hover:p-0 transition-all duration-200 hover:scale-105 hover:shadow-lg' onClick={onClick}>
        <img src={mediaContent[0]} alt='Campaign' className='w-full h-[158px] object-cover rounded-[15px]'></img>

        <div className='flex flex-col p-4'>
            <div className='block'>
                <h3 className='font-semibold text-[18px] text-left leading-[26px] truncate'>{campaignName}</h3>
                <p className='mt-[5px] font-[12px] text-[#343A40] text-left leading-[18px] truncate'>{campaignDescription}</p>
            </div>

            <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
                <div className='flex flex-col'>
                    <h4 className='font-semibold text-[14px] text-[#343A40] leading-[22px]'>{ethers.utils.formatUnits(ethers.BigNumber.from(currentFundsRaised.toString()), 18)}</h4>
                    <p className='mt-[3px] text-[12px] leading-[18px] text-[#343A40] sm:max-w-[120px] truncate'>Raised of {ethers.utils.formatUnits(ethers.BigNumber.from(fundraisingGoal.toString()), 18)}</p>
                </div>
            </div>

            <div className='flex items-center mt-[20px] gap-[6px] bg-[#E9ECEF] rounded-[15px] px-2'>
                <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center my-2'>
                    <FaUserCircle></FaUserCircle>
                </div>
                <p className='font-[12px] text-[#343A40] text-left leading-[18px] truncate font-mono'>{campaignCreator}</p>
            </div>
        </div>
    </div>
  )
}

export default CampaignCard