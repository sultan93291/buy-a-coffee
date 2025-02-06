import React from 'react'

function SocialIcon({children}) {
  return (
    <div className='social-icon h-10 w-10 flex items-center justify-center rounded-full border border-primaryColor duration-200 ease-in-out hover:bg-primaryColor'>
        {children}
    </div>
  )
}

export default SocialIcon