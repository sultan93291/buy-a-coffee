import BuyCoffee from "@/components/dashboard/MyPage/BuyCoffee/BuyCoffee";
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

        <div className="flex flex-row gap-x-5  w-full ">
          <div className="w-full">
            <BuyCoffee />
          </div>
          <Intro IntroData={data} />
        </div>
        {PostDataArr.length > 0 ? (
          <div className="">
            {PostDataArr.slice()
              .reverse()
              .map((item, index) => {
                return <PostCard data={item} key={item?.id}></PostCard>;
              })}
          </div>
        ) : (
          <p className="my-4">No post avialable</p>
        )}
      </div>
    </div>
  );
}

export default CreatorProfilePage;
