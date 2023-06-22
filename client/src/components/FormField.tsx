import React from 'react'

type Props = {
    labelName: string,
    inputType: string,
    value: string,
    isTextArea?: boolean,
    handleInputBoxChange?: React.ChangeEventHandler<HTMLInputElement>,
    handleTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>
}

const FormField = ( { labelName, inputType, value, isTextArea, handleInputBoxChange, handleTextAreaChange }: Props) => {
  return (
    <div className="flex flex-1 flex-col bg-[#DEE2E6] shadow-2xl rounded-[15px] border-[#CED4DA] border-[1px]">
      <label className="p-4">
        {labelName && (
          <span className="font-medium text-[14px] leading-[22px] mb-[10px] mx-4">
            {labelName}
          </span>
        )}
      </label>
      <div className="shadow-inner rounded-[15px] flex flex-1 flex-col bg-[#CED4DA] p-4 min-w-[200px]">
        {isTextArea ? (
          <textarea
            required
            value={value}
            onChange={handleTextAreaChange}
            rows={10}
            className="w-full p-[15px] outline-none border-[1px] border-[#343A40] bg-[#E9ECEF] text-[16px] rounded-[15px] text-[#495057]"
          ></textarea>
        ) : (
          <input
            required
            value={value}
            onChange={handleInputBoxChange}
            type={inputType}
            step="0.1"
            className="w-full p-[15px] outline-none border-[1px] border-[#343A40] bg-[#E9ECEF] text-[16px] rounded-[15px] text-[#495057]"
          ></input>
        )}
      </div>
    </div>
  )
}

export default FormField