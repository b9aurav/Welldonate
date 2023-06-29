import React, { Component } from 'react'

type Props = {
  styles?:string, 
  buttonType?:"button" | "submit" | "reset",
  title?:string,
  Icon?:React.ElementType,
  onClick?:React.MouseEventHandler<HTMLButtonElement>
}

const PrimaryButton = ( { styles, buttonType, title, Icon, onClick }: Props): JSX.Element => {
  return (
    <button type={buttonType} className={styles + ' hover:bg-[#212529] hover:shadow-2xl transition-all duration-500 flex items-center p-2 rounded-[15px]'} onClick={onClick}>
      {Icon && <Icon className='text-[#E9ECEF] mx-3 w-[20px] h-[20px]'/>}
      {title !== undefined && <p className='text-[#E9ECEF] mr-2 font-bold'>{title}</p> }
    </button>
  )
}

export default PrimaryButton