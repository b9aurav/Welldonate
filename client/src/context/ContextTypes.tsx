import { SmartContract } from "@thirdweb-dev/react"
import { MetaMaskWallet } from "@thirdweb-dev/wallets";
import { ethers } from "ethers"

type CampaignFormProp = {
    name: string,
    description: string,
    goal: ethers.BigNumber,
    image: string[]
}

interface StateContextType {
    readonly address: string | undefined,
    readonly contract: SmartContract<ethers.BaseContract> | undefined,
    readonly connect: (connectOptions?: { chainId?: number | undefined } | undefined) => Promise<MetaMaskWallet>,
    readonly getCampaigns: () => Promise<any[]>,
    readonly createCampaign: (form: CampaignFormProp) => Promise<void>,
    readonly getUserCampaigns: () => Promise<any[]>,
    readonly getDonations: (pID: any) => Promise<any[]>
    readonly donate: (pID: any, amount: any) => Promise<any[]>
    readonly logout: () => Promise<void>
};

export type { CampaignFormProp, StateContextType }