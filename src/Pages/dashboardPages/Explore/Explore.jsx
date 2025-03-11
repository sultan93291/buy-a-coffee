import CreatorProfile from "@/components/dashboard/Explore/CreatorProfile";
import Search from "@/components/dashboard/Explore/Search";
import Top from "@/components/dashboard/Top";
import { useTrendingCreatorsQuery } from "@/redux/features/api/apiSlice";

import { useState } from "react";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

function Explore() {
  const { data, error, isLoading } = useTrendingCreatorsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const creators = data?.data || [];

  const filteredSearchData = creators.filter(creator =>
    creator?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <Top title="Explore" />
      </div>
      <div className="lg:w-[1016px] w-full mx-auto mt-8">
        <div>
          <h3 className="lg:sub-heading mb-3 font-semibold text-base">
            A million creators have a home on gift a coffee
          </h3>
          <div>
            <Search onSearch={setSearchTerm} searchTerm={searchTerm} />
          </div>
          {/* Trending Creators */}
          <div className="mt-6">
            <h3 className="lg:sub-heading text-base font-semibold mb-3">
              Trending creators this week
            </h3>
            <div className="lg:p-12 p-8 pt-0 border border-[rgba(113,113,113,0.12)] justify-center items-center rounded-[12px] bg-white grid grid-cols-1 lg:grid-cols-2">
              {isLoading ? (
                <div className="col-span-2 text-center">
                  <MoonLoader size={30} color={"#000"} speedMultiplier={0.5} />
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
  );
}

export default Explore;
