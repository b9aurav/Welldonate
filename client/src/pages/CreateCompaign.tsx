import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { BiMoney } from "react-icons/bi";
import { useStateContext } from "../context";
import { BsFillMegaphoneFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { Loader, PrimaryButton } from "../components";
import FormField from "../components/FormField";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SmartContract } from "@thirdweb-dev/react";
import { StateContextType } from "../context/ContextTypes";
import { isImageExists } from "../utils";

type Props = {};

const CreateCampaign = (props: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext() as StateContextType;
  const [form, setForm] = useState({
    name: "",
    description: "",
    goal: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isImageExists(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({...form, goal: ethers.utils.parseUnits(form.goal, 18), image: form.image.split('|')});
        setIsLoading(false);
        navigate('/')
      } else {
        alert('Image is not valid!');
        setForm({ ...form, image: '' })
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welldonate | Create Campaign</title>
      </Helmet>
      <div className="bg-[#CED4DA] flex justify-center items-center shadow-lg flex-col rounded-[15px] sm:p-10 p-4">
        {isLoading && <Loader></Loader>}
        <div className="justify-flex justify-center shadow-lg items-center p-[16px] w-[100%] bg-[#E9ECEF] rounded-[15px]">
          <h3 className="sm:text-[25px] text-[18px] text-[#495057] leading-[38px] text-center justify-center items-center flex">
            <BsFillMegaphoneFill className="inline mx-2" />
            <b>CREATE CAMPAIGN</b>
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[40px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[15px]">
            <FormField
              labelName="Campaign Name"
              inputType="text"
              value={form.name}
              handleInputBoxChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange('name', e)}
            ></FormField>
            <FormField
              labelName="Goal"
              inputType="number"
              value={form.goal}
              handleInputBoxChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange('goal', e)}
            ></FormField>
            <FormField
              labelName="Image Link"
              inputType="text"
              value={form.image}
              handleInputBoxChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormFieldChange('image', e)}
            ></FormField>
          </div>
          <FormField
            labelName="Description"
            inputType="text"
            isTextArea
            value={form.description}
            handleTextAreaChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFormFieldChange('description', e)}
          ></FormField>
          <div className="flex justify-end items-end">
            <PrimaryButton
              buttonType="submit"
              title="CREATE"
              Icon={AiOutlinePlus}
              styles="bg-[#343A40]"
            ></PrimaryButton>
          </div>
        </form>
      </div>
    </HelmetProvider>
  );
};

export default CreateCampaign;
