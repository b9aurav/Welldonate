import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { StateContextType } from '../context/ContextTypes'
import { ShowCampaigns } from '../components'

type Props = {}

const Profile = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext() as StateContextType;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data: any = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract])
  

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welldonate | Profile</title>
      </Helmet>
    <ShowCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={Campaigns}
    ></ShowCampaigns>
    </HelmetProvider>
  )
}

export default Profile