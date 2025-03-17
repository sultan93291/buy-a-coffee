import Top from "../../../components/dashboard/Top";
import BuyCoffee from "@/components/dashboard/MyPage/BuyCoffee/BuyCoffee";
import Intro from "@/components/dashboard/MyPage/Intro";
import CreatePost from "@/components/dashboard/MyPage/CreatePost/CreatePost";
import Title from "@/components/dashboard/MyPage/Title";
import PostCard from "@/components/dashboard/MyPage/Posts/PostCard";
import ProfileSection from "@/components/dashboard/MyPage/ProfileSection";
import { useGetUserPostQuery } from "@/redux/features/api/apiSlice";
import RecntSupporters from "@/components/RecntSupporters/RecntSupporters";
import { useState } from "react";

function MyPage() {
  const { data, error, isLoading } = useGetUserPostQuery();
  console.log(data, error, isLoading);

  const PostDataArr = data?.data || [];

  return (
    <div className="">
      {/* Home Paget Top */}
      <div className="">
        <Top title={"Profile"}></Top>
      </div>
      <ProfileSection isMe={true} isCreator={false}></ProfileSection>
      <div className=" mt-40 lg:mt-32 grid grid-cols-1  lg:grid-cols-2 gap-4">
        <div className="">
          {/* column */}
          <Intro isMe={true}></Intro>
          {/* column */}
          {/* <BuyCoffee></BuyCoffee> */}
        </div>
        {/* column */}
        <div className="h-full relative flex flex-col gap-y-5 ">
          <div>
            <CreatePost></CreatePost>
          </div>
          <RecntSupporters isMe={true} />
        </div>
      </div>

      <div className="lg:p-6 p-4 mt-6 rounded-xl  bg-white border">
        <Title title={"Posts:"}></Title>

        <div className="flex flex-row justify-center lg:justify-between items-center flex-wrap w-full  gap-x-4 gap-y-5  ">
          {PostDataArr.length > 0 ? (
            PostDataArr.slice()
              .reverse()
              .map((item, index) => {
                return <PostCard isMe={true} data={item} key={item?.id} />;
              })
          ) : (
            <p>No post found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
