import React from 'react'

function ButtonPrimary({fontSize = '16px', text, type}) {
  return (
    <div className={`primary-button px-6 ${type === 'small' ? 'py-3' : 'py-3 lg:py-4'} bg-primaryColor rounded-[100px] text-headingColor border border-primaryColor font-bold duration-200 ease-out hover:bg-transparent`} style={{ fontSize }}>
        {text}
    </div>
  )
}

export default ButtonPrimary