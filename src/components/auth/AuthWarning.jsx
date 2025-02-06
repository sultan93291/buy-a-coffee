import React from 'react'
import warningImg from '../../assets/images/info-circle.png'

function AuthWarning({text}) {
  return (
    <div className='flex items-center py-3 md:py-4 px-5 md:px-6 gap-3 bg-[#F7F7F7] rounded-[12px]'>
        <div>
            <img className='h-6 min-w-6 max-w-6' src={warningImg} alt="" />
        </div>
        <div className='border-l border-[rgba(113,113,113,0.12)] pl-3 text-sm md:text-base'>
          {text}
        </div>
    </div>
  )
}

export default AuthWarning