import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape"
import Top from "@/components/dashboard/Top"
import thunderImg from '../../../assets/images/thunder.svg'
import cardIcon from '../../../assets/images/card.svg'
import { Link } from "react-router-dom"


function Payouts() {
  return (
    <div>
      <div>
        <Top title="Payouts" />
      </div>
      <div>
        <CommonBoxhShape>
          <p className="text-headingColor font-semibold mb-6">Total payouts</p>
          <h3 className="text-[40px] font-bold text-[#3D464F]">£0</h3>
        </CommonBoxhShape>
      </div>
      <div>
        <CommonBoxhShape>
          <p className="h-14 w-14 mx-auto mb-9 rounded-full flex items-center justify-center bg-[rgba(113,113,113,0.10)]">
            <img src={thunderImg} alt="thunderImg" />
          </p>
          <div className="text-center">
            <p className="text-[20px] font-semibold text-headingColor mb-2">Get Paid with Stripe</p>
            <p className="text-base text-paraDark">Instant payout via stripe</p>
          </div>
          <div>
            <Link to={''} className="flex items-center gap-[10px] py-4 px-8 rounded-[60px] bg-primaryColor text-headingColor w-fit mx-auto font-bold mt-9">
              <img src={cardIcon} alt="cardIcon" />
              <p>Connect Stripe</p>
            </Link>
          </div>
        </CommonBoxhShape>
      </div>
    </div>
  )
}

export default Payouts