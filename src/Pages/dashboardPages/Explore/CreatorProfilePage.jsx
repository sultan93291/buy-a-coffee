import Intro from "@/components/dashboard/MyPage/Intro";
import ProfileSection from "@/components/dashboard/MyPage/ProfileSection";
import Top from "@/components/dashboard/Top";
import { useGetSingleCreatorProfileQuery } from "@/redux/features/api/apiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function CreatorProfilePage() {
  const { creatorId } = useParams();
  const navigate = useNavigate(); 
  const { data, error, isLoading } = useGetSingleCreatorProfileQuery(creatorId);
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);

  useEffect(() => {
    if (loggedInUser?.id == creatorId) {
      navigate("/dashboard/my-page"); 
    }
  }, [creatorId, loggedInUser, navigate]);

  return (
    <div>
      <div>
        <Top title="Creator Profile" />
      </div>
      <div>
        <ProfileSection data={data} />
        <div>
          <Intro IntroData={data} />
        </div>
      </div>
    </div>
  );
}

export default CreatorProfilePage;
