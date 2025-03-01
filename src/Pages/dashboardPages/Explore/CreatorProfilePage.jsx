import BuyCoffee from "@/components/dashboard/MyPage/BuyCoffee/BuyCoffee";
import Intro from "@/components/dashboard/MyPage/Intro";
import PostCard from "@/components/dashboard/MyPage/Posts/PostCard";
import ProfileSection from "@/components/dashboard/MyPage/ProfileSection";
import Title from "@/components/dashboard/MyPage/Title";
import Top from "@/components/dashboard/Top";
import RecntSupporters from "@/components/RecntSupporters/RecntSupporters";
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
    <>
      <div>
        <Top title="Creator Profile" />
      </div>
      <div className="">
        <ProfileSection data={data} />

        <div className="flex flex-col mt-12 lg:mt-0 gap-y-5 xl:flex-row gap-x-5  w-full ">
          <div className="w-full relative flex flex-col md:flex-row gap-5  ">
            <div className="md:w-[50%]">
              <BuyCoffee data={data} />
            </div>
            <div className="md:w-[50%]">
              <RecntSupporters />
            </div>
          </div>
          <Intro IntroData={data} />
        </div>
        <div className="lg:p-6 p-4 mt-6 rounded-xl  bg-[white] border">
          <Title title={"Posts:"}></Title>

          <div className="flex flex-row justify-center  lg:justify-between items-center flex-wrap w-full  gap-x-4 gap-y-5  ">
            {PostDataArr.length > 0 ? (
              PostDataArr.slice()
                .reverse()
                .map((item, index) => {
                  return <PostCard data={item} key={item?.id} />;
                })
            ) : (
              <p>No post found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatorProfilePage;
