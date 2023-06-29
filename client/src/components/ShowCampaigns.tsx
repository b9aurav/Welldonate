import React from 'react'
import { useNavigate } from 'react-router-dom'
import CampaignCard from './CampaignCard'
import Loader from './Loader'

type Props = {
    title: string,
    isLoading: boolean,
    campaigns: any[]
}

const ShowCampaigns = ( { title, isLoading, campaigns }: Props): JSX.Element => {
  const navigate = useNavigate();
  const viewCampaign = (campaign: any) => {
    navigate(`/campaign-details/${campaign.campaignName}`, { state: campaign })
  }

  return (
    <div>
        <h1 className='font-semibold text-[18px] text-[#343A40]'>{title} ({campaigns.length})</h1>
        <div className='flex flex-wrap mt-[20px] gap-[26px]'>
            {isLoading && <Loader></Loader>}

            {!isLoading && campaigns.length === 0 && (
                <p className='font-semibold text-[14px] text-[#495057] leading-[30px]'>No campaigns available.</p>
            )}

            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
                <CampaignCard 
                    key={campaign.campaignId} 
                    {...campaign}
                    onClick={() => viewCampaign(campaign)}
                ></CampaignCard>)}
        </div>
    </div>
  )
}

export default ShowCampaigns