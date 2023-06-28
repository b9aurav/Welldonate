import React, { useContext, createContext, ReactNode } from 'react'
import { useAddress, useContract, useMetamask, useContractWrite, SmartContract } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { StateContextType, CampaignFormProp } from './ContextTypes';

interface Props {
    children?: ReactNode
}

const StateContext = createContext<StateContextType | null>(null);

export const StateContextProvider = ({ children }: Props) => {
    const { contract } = useContract('0x753D024DF0F689f73cAC0211FDa189fF6ad0Fa02');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form: CampaignFormProp) => {
        try {
            const data = await contract?.call("createCampaign", [
                form.name,
                form.description,
                form.goal,
                form.image
            ])
            console.log('Success', data);
        } catch (error) {
            console.log('Failed', error);
        }
    }

    const getCampaigns = async () => {
        const campaigns: any[] = await contract?.call('getCampaigns');
        const parsedCampaigns = campaigns.map((campaign, index) => ({
            campaignCreator: campaign.campaignCreator,
            campaignName: campaign.campaignName,
            campaignDescription: campaign.campaignDescription,
            fundraisingGoal: campaign.fundraisingGoal,
            currentFundsRaised: campaign.currentFundsRaised,
            mediaContent: campaign.mediaContent,
            id: index
        }));
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const campaigns: any[] = await contract?.call('getCampaigns');
        const filteredCampaigns: any[] = campaigns.filter((campaign) => campaign.owner === address)
        return filteredCampaigns;
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            getCampaigns,
            createCampaign: publishCampaign,
            getUserCampaigns
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);