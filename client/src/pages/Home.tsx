import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { StateContextType } from '../context/ContextTypes'
import { ShowCampaigns } from '../components'

type Props = {}

const Home = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext() as StateContextType;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data: any = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract])
  

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welldonate | Home</title>
      </Helmet>
    <ShowCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={Campaigns}
    ></ShowCampaigns>
    </HelmetProvider>
  )
}

export default Home