import Intro from "@/components/dashboard/MyPage/Intro";
import PostCard from "@/components/dashboard/MyPage/Posts/PostCard";
import ProfileSection from "@/components/dashboard/MyPage/ProfileSection";
import Top from "@/components/dashboard/Top";
import {
  useGetSingleCreatorProfileQuery,
  useGetUserPostQuery,
  useGetUserPostsByIdQuery,
} from "@/redux/features/api/apiSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function CreatorProfilePage() {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetSingleCreatorProfileQuery(creatorId);
  const {
    data: postData,
    error: postError,
    isLoading: isPostLoading,
  } = useGetUserPostsByIdQuery(creatorId);
  console.log(data, error, isLoading);

  const PostDataArr = postData?.data || [];
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px] lg:h-[300px] overflow-y-scroll scrollbar-hide">
          {PostDataArr.slice()
            .reverse()
            .map((item, index) => {
              return <PostCard data={item} key={item?.id}></PostCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default CreatorProfilePage;
