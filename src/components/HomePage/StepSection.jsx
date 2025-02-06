import React from 'react'
import Step from './homeComponents/Step';
import StepImageOne from '../../assets/images/step1.png';
import StepImageTwo from '../../assets/images/step2.png';

function StepSection() {
    const stepsData = [
        {
            id:1,
            tag:"Donaions",
            title:"Let your supporters show their appreciation for your good work.",
            description:"Gift A Coffee simplifies and adds a fun twist to supporting creators, athletes, musicians and more. With just a few taps, your fans can make a payment to buy you a coffee and leave a message, all without needing to create an account!",
            reversed:false,
        },
        {
            id:2,
            tag:"Membership",
            title:"Monthly membership for your biggest fans.",
            description:"Generate a steady income by offering monthly subscriptions. Provide access to exclusive content, or simply create an opportunity for your audience to support your work consistently.",
            reversed:true,
        },
        
    ]
  return (
    <section className='pt-5 pb-[60px] lg:pb-[100px] bg-primaryLight lg:mt-[-50px]'>
        <div className='container'>
            <div>
                {
                    stepsData.map((item) => (
                        <div key={item.id}>
                            <Step item={item} imgSrc={item.id === 1 ? StepImageOne : StepImageTwo} />
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
  )
}

export default StepSection