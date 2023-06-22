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
            console.log('Success', error);
        }
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);