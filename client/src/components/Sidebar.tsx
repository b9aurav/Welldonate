import React, { useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { navlinks } from '../constants/'
import { BsBoxArrowInRight } from "react-icons/bs";

type Props = {}
type MenuItemProps = {
  styles?:string, 
  name?:string,
  title?:string,
  icon?:JSX.Element, 
  isActive?:boolean | string, 
  disabled?:boolean, 
  onClick?:React.MouseEventHandler<HTMLDivElement>
}

const MenuItem = ( { styles, name, title, icon, isActive, disabled, onClick}: MenuItemProps): JSX.Element => ( 
  <div className={`w-[215px] h-[48px] rounded-[15px] ${isActive && isActive === name && 'bg-[#F8F9FA] shadow-lg'} flex items-center ${!disabled && 'cursor-pointer'} ${disabled && 'cursor-not-allowed'} ${styles}`}
    onClick={onClick}
  >
    {!isActive ? (
      <div className={`w-1/4 h-1/2`}>
        {icon}
      </div>
    ) : (
      <div className={`w-1/4 h-1/2 text-[#343A40] ${isActive !== name && 'grayscale'}`}>
        {icon}
      </div>
    )}
    <span className='text-[#495057]'><b>{title}</b></span>
  </div>
)

const Sidebar = (props: Props) => {
  const navigate:NavigateFunction = useNavigate();
  const [isActive, setIsActive] = useState('dashboard')
  
  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link to={'/'}>
        <img src='/assets/svg/logo-no-background.svg' alt='welldonate-logo' width='240'></img>
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center bg-[#CED4DA] rounded-[15px] shadow-lg w-[240px] py-4 mt-4'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navlinks.map((link) => (
            <MenuItem
              styles='hover:bg-[#DEE2E6] transition ease-in-out duration-500'
              key={link.name}
              {...link}
              isActive={isActive}
              onClick={() => {
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link)
                }
              }}
            ></MenuItem>
          ))}
        </div>

        <MenuItem
          styles='hover:bg-[#DEE2E6] transition ease-in-out duration-500'
          name='logout'
          title='Logout'
          key={'/'}
          disabled
          icon={<BsBoxArrowInRight className="w-full h-full p-1"/>}
      ></MenuItem>
      </div>
    </div>
  )
}

export default Sidebar