import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useStateContext } from "../context";
import { PrimaryButton, CountBox, Loader } from "../components";
import { calculatePercentage } from "../utils";
import { FaUserCircle } from "react-icons/fa";
import { FcDonate } from "react-icons/fc"
import { StateContextType } from "../context/ContextTypes";

type Props = {};

const CampaignDetails = (props: Props) => {
  const { state } = useLocation();
  const { donate, getDonations, contract, address } = useStateContext() as StateContextType;

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<Array<any>>([]);

  const fetchDonators = async () => {
    const data: any[] = await getDonations(state.campaignId);
    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.campaignId, amount);
    setIsLoading(false);
  }

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>Welldonate | Profile</title>
        </Helmet>
        <div className="bg-[#CED4DA] flex justify-center items-center shadow-lg flex-col rounded-[15px] sm:p-10 p-4">
          {isLoading && <Loader></Loader>}
          <div className="justify-flex justify-center shadow-lg items-center p-[16px] w-[100%] bg-[#E9ECEF] rounded-[15px]">
            <div className="flex-1 flex-col">
              <img
                src={state.mediaContent[0]}
                alt="Campaign"
                className="w-full h-[350px] object-cover rounded-[15px]"
              />
              <div className="relative w-full h-[10px] bg-[#ADB5BD] mt-4 rounded-[15px]">
                <div
                  className="absolute h-full bg-[#343A40] rounded-[15px]"
                  style={{
                    width: `${calculatePercentage(
                      Number.parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(state.fundraisingGoal), 18)),
                      Number.parseFloat(ethers.utils.formatUnits(ethers.BigNumber.from(state.currentFundsRaised), 18))
                    )}%`,
                    maxWidth: "100%",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col auto-cols-auto gap-2 mt-4 w-full">
            <CountBox
              title={`Raised of ${ethers.utils.formatUnits(
                ethers.BigNumber.from(state.fundraisingGoal).toString(),
                18
              )}`}
              value={ethers.utils.formatUnits(
                ethers.BigNumber.from(state.currentFundsRaised).toString(),
                18
              )}
            />
            <CountBox
              title="Total Donators"
              value={donators.length.toString()}
            />
          </div>
          <div className="grid grid-flow-col auto-cols-auto gap-2 mt-4 w-full">
            <div className="flex flex-wrap gap-4 w-full hover:scale-y-110 transition-all duration-200">
              <div className="flex-1 md:w-1/2">
                <div className="flex flex-col bg-gray-300 shadow-2xl rounded-lg">
                  <p className="font-bold text-xs p-3 bg-gray-200 rounded-t-lg text-center">
                    <span className="inline-block md:max-w-full md:overflow-visible text-[10px] md:text-[16px] lg:text-[18px] xl:text-[22px] sm:w-auto truncate">
                      {state.campaignCreator}
                    </span>
                  </p>
                  <div className="bg-gray-300 flex justify-center items-center px-3 py-2 rounded-b-lg">
                    <FaUserCircle className="mr-2"></FaUserCircle>
                    <p className="font-normal text-sm text-center">
                      Campaign Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-[30px] w-full mt-4">
            <div className="flex-1 md:w-1/2">
              <div className="flex flex-col bg-[#DEE2E6] rounded-[15px] border-[#CED4DA] border-[1px]">
                <h4 className="font-bold text-[18px] p-3 text-[#343A40] bg-[#E9ECEF] rounded-t-[10px] text-center truncate shadow-inner">
                  Description
                </h4>
                <textarea
                  disabled
                  className="font-normal text-[16px] text-[#343A40] bg-[#DEE2E6] px-3 py-2 rounded-b-[10px]"
                  value={state.campaignDescription}
                >
                </textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-[30px] w-full mt-4">
            <div className="flex-1 md:w-1/2">
              <div className="flex flex-col bg-[#DEE2E6] rounded-[15px] border-[#CED4DA] border-[1px]">
                <h4 className="font-bold text-[18px] p-3 text-[#343A40] bg-[#E9ECEF] rounded-t-[10px] text-center truncate shadow-inner">
                  Donators
                </h4>
                <div className="font-normal text-[16px] text-[#343A40] bg-[#DEE2E6] px-3 py-2 rounded-b-[10px]">
                  {donators.length > 0 ? (
                    donators.map((item, index) => <div key={`${item.donator}-${index}}`} className="flex justify-between items-center gap-4">
                      <p className="font-normal leading-[26px] inline-block md:max-w-full md:overflow-visible text-[10px] md:text-[16px] lg:text-[18px] xl:text-[22px] sm:w-auto truncate">{index + 1}. {item.donator}</p>
                    </div>)
                  ) : (
                    <p className="text-[14px] leading-[26px] text-justify">
                      No donators yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-[30px] w-full mt-4">
            <div className="flex-1 md:w-1/2">
              <div className="flex flex-col bg-[#DEE2E6] rounded-[15px] border-[#CED4DA] border-[1px]">
                <h4 className="font-bold text-[18px] p-3 text-[#343A40] bg-[#E9ECEF] rounded-t-[10px] text-center truncate shadow-inner">
                  Donate
                </h4>
                <div className="font-normal text-[16px] text-[#343A40] bg-[#DEE2E6] px-3 py-2 rounded-b-[10px]">
                  <div className="px-4 pb-4">
                    <p className="m-2">Donate the campaign.</p>
                    <input
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      type="number"
                      placeholder="ETH"
                      step="0.01"
                      min={0}
                      className="w-full p-[15px] outline-none border-[1px] border-[#343A40] bg-[#E9ECEF] text-[16px] rounded-[15px] text-[#495057]"
                    ></input>
                    <div className="mt-2 justify-center flex items-center">
                    <PrimaryButton
                      buttonType="submit"
                      title="DONATE"
                      Icon={FcDonate}
                      onClick={handleDonate}
                      styles="bg-[#343A40] pr-4"
                    ></PrimaryButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </div>
  );
};

export default CampaignDetails;
