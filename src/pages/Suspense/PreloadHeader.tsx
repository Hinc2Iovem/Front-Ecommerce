import React from 'react'

export default function PreloadHeader() {
  return (
      <header className="h-[9.5rem] w-full bg-white shadow-sm rounded-b-md flex items-center p-[1rem] justify-between">
        <div className="bg-white shadow-md w-[14rem] md:block hidden h-[4.5rem]"></div>
        <div className="bg-white shadow-md w-[55%] md:w-[40%] h-[4.5rem]"></div>
        <div className="w-[11rem] h-[4.5rem] flex items-center gap-[1rem]">
          <div className="w-[3rem] h-[3rem] rounded-full bg-white shadow-md"></div>
          <div className="w-[3rem] h-[3rem] rounded-full bg-white shadow-md"></div>
          <div className="w-[3rem] h-[3rem] rounded-full bg-white shadow-md"></div>
        </div>
      </header>
  )
}
