import Top from "../../../components/dashboard/Top";
import BuyCoffee from "@/components/dashboard/MyPage/BuyCoffee/BuyCoffee";
import Intro from "@/components/dashboard/MyPage/Intro";
import CreatePost from "@/components/dashboard/MyPage/CreatePost/CreatePost";
import Title from "@/components/dashboard/MyPage/Title";
import PostCard from "@/components/dashboard/MyPage/Posts/PostCard";
import ProfileSection from "@/components/dashboard/MyPage/ProfileSection";
import { useGetUserPostQuery } from "@/redux/features/api/apiSlice";

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
        <div className="flex flex-col lg:flex-row gap-y-5 gap-x-4 ">
          {/* column */}
          <Intro isMe={true}></Intro>
          {/* column */}
          <div className="lg:w-[496px]">
            <BuyCoffee isFullwidth={true} ></BuyCoffee>
          </div>
          <CreatePost></CreatePost>
        </div>
        {/* column */}
      </div>

      <div className="lg:p-6 p-4 mt-6 rounded-xl  bg-white border">
        <Title title={"Posts:"}></Title>

        {PostDataArr.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px] lg:h-[300px] overflow-y-scroll scrollbar-hide">
            {PostDataArr.slice()
              .reverse()
              .map((item, index) => {
                return <PostCard data={item} key={item?.id}></PostCard>;
              })}
          </div>
        ) : (
          <p> No post available </p>
        )}
      </div>
    </div>
  );
}

export default MyPage;
