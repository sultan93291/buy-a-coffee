import React from 'react'
import Searchbar from './homeComponents/Searchbar'

function TakeDonationSection() {
  return (
    <section className='py-[70px]'>
        <div className='container'>
            <div className='w-[980px] mx-auto'>
                <h3 className='text-[48px] font-semibold leading-[64px] text-headingColor text-center'>Take donations, monthly memberships and shop sales - all in one place</h3>
                <p className='text-center text-paraColor mt-4'>Start accepting donations in 60 seconds. Grow your income by opening your Ko-fi Shop, offering memberships or selling commissions and services.</p>
                <div className='w-[463px] mx-auto mt-6 text-center'>
                    <p className='text-paraColor mb-3'>All from your single, beautiful Ko-fi page.</p>
                    <Searchbar webUrl="giftacoffee.com/" btnText="Claim"/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TakeDonationSection