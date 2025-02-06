
import Tag from './Tag'

function Step({item, imgSrc}) {
  return (
    <div className={`lg:flex items-center lg:justify-between mt-10 lg:mt-20 ${item.reversed ? 'flex-row-reverse' : ''}`}>
        <div className='lg:w-[536px]' data-aos="fade-up" data-aos-delay="100">
            <div className='mb-3 md:mb-4'>
            <Tag text={item.tag} />
            </div>
            <h3 className='text-[24px] leading-[32px] lg:text-[40px] font-bold text-headingColor lg:leading-[132%]'>{item.title}</h3>
            <p className='text-sm mt-5 md:mt-0 leading-[23px] md:leading-normal md:text-base text-paraDeep'>{item.description}</p>
        </div>
        <div className='mt-8 md:mt-0' data-aos="fade-up" data-aos-delay="100">
            <img className={`${item.id === 1 ? 'h-[247px] w-full lg:h-[563px] lg:w-[657px]' : 'h-[233px] lg:h-[614px] lg:w-[760px]'}`} src={imgSrc} alt="img" />
        </div>
    </div>
  )
}

export default Step