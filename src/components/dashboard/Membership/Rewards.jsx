import RewardIcon from "../../../assets/images/award.svg"

function Rewards({text}) {
  return (
    <div className="flex items-center gap-2 py-3 px-4 md:py-4 md:px-5 bg-[#FBFFF1] rounded-[8px] border border-[rgba(113,113,113,0.12)]">
        <img className="h-7 w-7" src={RewardIcon} alt="RewardIcon" />
        <p className="text-sm md:text-base text-[#717171]">{text}</p>
    </div>
  )
}

export default Rewards