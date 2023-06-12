import React, { Component } from 'react'

type Props = {
  styles?:string, 
  buttonType?:"button" | "submit" | "reset",
  title?:string,
  Icon?:React.ElementType,
  onClick?:React.MouseEventHandler<HTMLButtonElement>
}

const Icon: React.FC = () => <h2>This is a child component</h2>

const PrimaryButton = ( { styles, buttonType, title, Icon, onClick }: Props): JSX.Element => {
  return (
    <button type={buttonType} className={styles + ' flex items-center p-2 rounded-[15px]'} onClick={onClick}>
      {Icon && <Icon className='text-[#E9ECEF] mx-2 w-[20px] h-[20px]'/>}
      <p className='text-[#E9ECEF] mr-2 font-bold'>{title}</p>
    </button>
  )
}

export default PrimaryButton