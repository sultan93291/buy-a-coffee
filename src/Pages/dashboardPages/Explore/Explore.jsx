import CreatorProfile from "@/components/dashboard/Explore/CreatorProfile";
import Search from "@/components/dashboard/Explore/Search";
import Top from "@/components/dashboard/Top";
import { useState } from "react";
import { Link } from "react-router-dom";

function Explore() {
  const creatorsData = [
    {
      id: 1,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/ZmXfVhK/image-104.png",
      creatorNum: "#1",
    },
    {
      id: 2,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/jrTXdFf/image-105.png",
      creatorNum: "#2",
    },
    {
      id: 3,
      name: "Creative Studio",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/vvy0NGc/image-106.png",
      creatorNum: "#3",
    },
    {
      id: 4,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/PM3w7dT/image-107.png",
      creatorNum: "#4",
    },
    {
      id: 5,
      name: "Artist Ever",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/ZmXfVhK/image-104.png",
      creatorNum: "#5",
    },
    {
      id: 6,
      name: "Jack's Creation",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/jrTXdFf/image-105.png",
      creatorNum: "#6",
    },
    {
      id: 7,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/vvy0NGc/image-106.png",
      creatorNum: "#7",
    },
    {
      id: 8,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/PM3w7dT/image-107.png",
      creatorNum: "#8",
    },
    {
      id: 9,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/ZmXfVhK/image-104.png",
      creatorNum: "#9",
    },
    {
      id: 10,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/jrTXdFf/image-105.png",
      creatorNum: "#10",
    },
    {
      id: 11,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/vvy0NGc/image-106.png",
      creatorNum: "#11",
    },
    {
      id: 12,
      name: "Simple Politics",
      description: "Helping people have better conversations about politics",
      creatorImg: "https://i.ibb.co.com/PM3w7dT/image-107.png",
      creatorNum: "#12",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSearchData = creatorsData.filter((creator) =>
    creator.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <div>
        <Top title="Explore" />
      </div>
      <div className="lg:w-[1016px] w-full mx-auto mt-8">
        <div>
          <h3 className="lg:sub-heading mb-3 font-semibold  text-base ">
            A million creators have a home on gift a coffee
          </h3>
          <div>
            <Search onSearch={setSearchTerm} searchTerm={searchTerm} />
          </div>
          {/* trending creators  */}
          <div className="mt-6">
            <h3 className="lg:sub-heading text-base font-semibold mb-3">Trending creators this week</h3>
            <div className="lg:p-12 p-8 pt-0 border border-[rgba(rgba(113,113,113,0.12))] justify-center items-center rounded-[12px] bg-white grid grid-cols-1 lg:grid-cols-2">
              {filteredSearchData.length > 0 ? (
                filteredSearchData.map((creator) => (
                  <Link
                    to={`/dashboard/explore/creator/${creator.id}`}
                    key={creator.id}
                  >
                    <CreatorProfile creator={creator} />
                  </Link>
                ))
              ) : (
                <p className="col-span-2 text-center ">No creators Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
