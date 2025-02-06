import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import StepSection from '../components/HomePage/StepSection'
import TakeDonationSection from '../components/HomePage/TakeDonationSection'
import SupporterFunctionalitySection from '../components/HomePage/SupporterFunctionalitySection'

function HomePage() {
  return (
    <div>
        <HeroSection />
        <StepSection />
        {/* <TakeDonationSection /> */}
        <SupporterFunctionalitySection />
    </div>
  )
}

export default HomePage