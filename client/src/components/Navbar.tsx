import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";
import { navlinks } from "../constants";
import { BsSearch, BsFillPlusSquareFill } from "react-icons/bs";
import { FaWallet, FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

type Props = {};

const Navbar = (props: Props) => {
  const navigate: NavigateFunction = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const address = "";

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#CED4DA] rounded-[15px]">
        <input
          type="text"
          placeholder="Search Campaign"
          className="flex w-full font-normal text-[14px] placeholder:text-[#6C757D] text-gray-800 bg-transparent outline-none"
        ></input>
        <div className="w-[72px] h-full rounded-[15px] bg-[#343A40] flex justify-center items-center cursor-pointer">
          <BsSearch className="w-[15px] h-[15px] object-contain text-[#E9ECEF]"></BsSearch>
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <PrimaryButton
          buttonType="button"
          title={address ? " CAMPAIGN" : "CONNECT"}
          styles="bg-[#343A40]"
          Icon={address ? BsFillPlusSquareFill : FaWallet}
          onClick={() => {
            if (address) navigate("create-campaign");
            // else 'connect()'
          }}
        ></PrimaryButton>

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-[15px] bg-[#E9ECEF] flex justify-center items-center cursor-pointer border-[5px] border-[#343A40]">
            <FaUser className="h-full w-full text-[#343A40] p-2"></FaUser>
          </div>
        </Link>
      </div>

      {/* Small screen */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[15px] bg-[#E9ECEF] flex justify-center items-center cursor-pointer border-[5px] border-[#343A40]">
          <FaUser className="h-full w-full text-[#343A40] p-2"></FaUser>
        </div>

        <BiMenu
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer(!toggleDrawer)}
        ></BiMenu>
      </div>

      <div
        className={`absolute top-[60px] right-0 left-0 bg-[#CED4DA] rounded-[15px] m-4 z-10 shadow-secondary py-4 ${
          !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
        } transition-all duration-700`}
      >
        <ul className="mb-4">
          {navlinks.map((link) => (
            <li
              key={link.name}
              className={`flex p-4 ${
                isActive === link.name && "bg-[#F8F9FA]"
              } rounded-[15px] mx-4`}
              onClick={() => {
                setIsActive(link.name);
                setToggleDrawer(false);
                navigate(link.link);
              }}
            >
              <div
                className={`w-[24px] h-[24px] object-contain text-[#343A40] ${
                  isActive === link.name ? "grayscale-0" : "grayscale"
                }`}
              >
                {link.icon}
              </div>
              <p className="ml-[20px] text-[14px] text-[#343A40]">
                {link.title}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex mx-4 items-center justify-center ">
          <PrimaryButton
            buttonType="button"
            title={address ? " CAMPAIGN" : "CONNECT"}
            styles="bg-[#343A40]"
            Icon={address ? BsFillPlusSquareFill : FaWallet}
            onClick={() => {
              if (address) navigate("create-campaign");
              // else 'connect()'
            }}
          ></PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
