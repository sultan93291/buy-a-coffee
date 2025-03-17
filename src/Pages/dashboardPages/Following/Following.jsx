import CommonBoxhShape from "@/components/dashboard/CommonComponents/CommonBoxhShape";
import Top from "@/components/dashboard/Top";
import { IoHeart } from "react-icons/io5";
import { useSelector } from "react-redux";
import CreatorProfile from "@/components/dashboard/Explore/CreatorProfile";
import Search from "@/components/dashboard/Explore/Search";
import { useGetAllFollowingQuery } from "@/redux/features/api/apiSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoonLoader, PuffLoader } from "react-spinners";

function Following() {
  const loggedInUser = useSelector(state => state.userDocReducer.loggedInuser);
  const { data, error, isLoading } = useGetAllFollowingQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [allfollowers, setallfollowers] = useState([]);

  const creators = data?.data?.follower_list || [];

  useEffect(() => {
    if (data?.data?.following_list) {
      console.log(data.data.fo);

      const followers = data.data.following_list
        .map(item => item?.following)
        .flat(); // 🔹 Flatten nested arrays

      console.log(followers, " this is the followers");

      setallfollowers(followers);
    }
  }, [data]);

  const filteredSearchData = allfollowers.filter(creator =>
    (creator?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredSearchData, " this is the filtered search data");

  if (isLoading && !loggedInUser)
    return (
      <div className="h-full w-full flex items-center justify-center ">
        <PuffLoader size={100} color="#99FF6D" />
      </div>
    );

  return (
    <div className="flex flex-col gap-y-5 ">
      <div>
        <div>
          <Top title="Followers" />
        </div>
        <div>
          <CommonBoxhShape>
            <p className="h-12 w-12 rounded-full bg-[#f4f4f4] flex items-center justify-center mx-auto text-2xl mb-6 text-center">
              <IoHeart />
            </p>
            <p className="text-center text-headingColor font-semibold">
              {loggedInUser?.following_count === 0
                ? ` Currently you're following no one `
                : ` You have ${loggedInUser?.following_count} following `}
            </p>
          </CommonBoxhShape>
        </div>
      </div>
      <div>
        <div className="lg:w-[1016px] w-full mx-auto mt-8">
          <div>
            <h3 className="lg:sub-heading mb-3 font-semibold text-base">
              Search Following
            </h3>
            <div>
              <Search onSearch={setSearchTerm} searchTerm={searchTerm} />
            </div>
            {/* Trending Creators */}
            <div className="mt-6">
              <h3 className="lg:sub-heading text-base font-semibold mb-3">
                All following
              </h3>
              <div className="lg:p-12 p-8 pt-0 border border-[rgba(113,113,113,0.12)] justify-center items-center rounded-[12px] bg-white grid grid-cols-1 lg:grid-cols-2">
                {isLoading ? (
                  <div className="col-span-2 text-center">
                    <MoonLoader
                      size={30}
                      color={"#000"}
                      speedMultiplier={0.5}
                    />
                  </div>
                ) : filteredSearchData.length > 0 ? (
                  filteredSearchData.map(creator => (
                    <Link
                      to={`/dashboard/explore/creator/${creator.id}`}
                      key={creator.id}
                    >
                      <CreatorProfile creator={creator} />
                    </Link>
                  ))
                ) : (
                  <p className="col-span-2 text-center">No creators found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Following;
