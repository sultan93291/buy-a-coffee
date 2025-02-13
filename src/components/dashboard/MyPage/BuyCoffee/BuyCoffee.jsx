import { useState } from "react";
import Title from "../Title";
import { useSelector } from "react-redux";


function BuyCoffee() {
    const [hovered, setHovered] = useState(false);
  const BtnColor = useSelector(state => state.btnReducer.btnColor);

  const defaultColor = "#99FF6D";
  const buttonColor = BtnColor || defaultColor; // If BtnColor is undefined, use the default color

  const buttonStyles = {
    backgroundColor: hovered ? "transparent" : buttonColor, // Transparent on hover, btn color otherwise
    border: `2px solid ${hovered ? buttonColor : "transparent"}`, // Border is always there, but only shows color on hover
    color: hovered ? buttonColor : "#000", // Text color on hover and default text color (black)
  };

  const [activeIndex, setActiveIndex] = useState(1);
  const [buyType, setBuyType] = useState("monthly");
  const [count, setCount] = useState(10);

  const handleBuyCoffee = (index, value) => {
    setActiveIndex(index);
    setBuyType(value);
  };

  const buyCoffeOptions = ["one-off", "monthly"];

  console.log(buyType);

  return (
    <div className="lg:p-6 p-4 rounded-xl flex h-full flex-col justify-between bg-white border space-y-4">
      <Title title={"Buy a Coffee for Zaan:"}></Title>
      <div className="flex gap-4 pt-0 items-center">
        {buyCoffeOptions.map((option, index) => (
          <div key={option} className="flex-1">
            <button
              onClick={() => handleBuyCoffee(index, option)}
              className={` ${
                activeIndex === index
                  ? "border-borderColor bg-primaryLight"
                  : ""
              } capitalize w-full py-3 text-sm font-bold border rounded-full`}
            >
              {option}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center ">
        <div className="flex  items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <mask
              id="mask0_9587_5526"
              maskUnits="userSpaceOnUse"
              x="7"
              y="6"
              width="34"
              height="36"
            >
              <path
                d="M7.95801 6.1582H40.0413V41.8749H7.95801V6.1582Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0_9587_5526)">
              <mask
                id="mask1_9587_5526"
                maskUnits="userSpaceOnUse"
                x="7"
                y="6"
                width="34"
                height="36"
              >
                <path
                  d="M10.358 6.1582H37.6413C38.9663 6.1582 40.0413 7.2332 40.0413 8.5582V39.4415C40.0413 40.7665 38.9663 41.8415 37.6413 41.8415H10.358C9.03301 41.8415 7.95801 40.7665 7.95801 39.4415V8.5582C7.95801 7.2332 9.03301 6.1582 10.358 6.1582Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask1_9587_5526)">
                <path
                  d="M7.95801 6.1582H40.0413V41.8749H7.95801V6.1582Z"
                  fill="#99FF6D"
                />
              </g>
            </g>
            <mask
              id="mask2_9587_5526"
              maskUnits="userSpaceOnUse"
              x="10"
              y="10"
              width="28"
              height="29"
            >
              <path
                d="M10.7451 10.0625H37.1451V38.0625H10.7451V10.0625Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask2_9587_5526)">
              <path
                d="M31.4396 24.5419C31.4563 25.8336 31.3979 27.4336 31.2229 28.9586C31.4688 28.7377 31.7146 28.5377 31.9563 28.3461C33.1521 27.3877 34.2188 26.5336 33.9146 25.1211C33.8313 24.6877 33.5979 24.3544 33.2979 24.1502C33.1521 24.0502 32.9938 23.9752 32.8354 23.9461C32.6771 23.9169 32.5063 23.9169 32.3313 23.9461C32.0313 24.0211 31.7146 24.2086 31.4396 24.5419ZM24.7188 18.2836C24.6729 18.6752 24.3146 18.9502 23.9104 18.9086C23.5229 18.8502 23.2479 18.4877 23.3063 18.0961C23.3063 18.0961 23.3646 17.6294 23.3229 17.6169C23.1896 17.5877 22.7146 17.5711 22.1271 17.5586C21.4354 17.5586 20.6021 17.5419 19.8229 17.4711C18.6563 17.3544 17.8938 16.9336 17.4771 16.3961C17.2146 16.0627 17.0854 15.6669 17.0854 15.2752C17.0729 14.9002 17.1729 14.5211 17.3771 14.1711C17.7479 13.5211 18.4813 12.9836 19.4604 12.7794C20.4979 12.5752 23.1479 12.6627 25.2229 12.7336C26.0563 12.7627 26.7896 12.7919 27.2521 12.7919H27.2938C27.9438 12.8377 28.3896 12.7211 28.6604 12.5169C28.7771 12.4294 28.8646 12.3419 28.9229 12.2419C28.9771 12.1252 29.0063 12.0086 29.0063 11.9086C29.0229 11.6877 28.9646 11.4877 28.8479 11.3252C28.6313 10.9919 28.7062 10.5419 29.0229 10.3086C29.3521 10.0794 29.7979 10.1669 30.0313 10.4836C30.3313 10.9211 30.4771 11.4586 30.4479 11.9961C30.4313 12.3127 30.3479 12.6336 30.1896 12.9252C30.0312 13.2127 29.7979 13.4752 29.4979 13.6961C28.9646 14.0711 28.2146 14.3044 27.2063 14.2294C26.7021 14.2294 25.9854 14.2044 25.1771 14.1877C23.1896 14.1169 20.6271 14.0294 19.7521 14.2044C19.1896 14.3169 18.8021 14.5961 18.6146 14.9002C18.5396 15.0169 18.5104 15.1336 18.5104 15.2461C18.5104 15.3336 18.5563 15.4211 18.6146 15.5086C18.8021 15.7544 19.2313 15.9586 19.9521 16.0336C20.6854 16.0919 21.4771 16.1044 22.1396 16.1211C22.8313 16.1336 23.3938 16.1336 23.6646 16.2044C24.9479 16.5252 24.7313 18.2836 24.7188 18.2836ZM16.6688 26.7794C16.6396 26.3711 16.9438 26.0377 17.3479 26.0086C17.7354 25.9794 18.0813 26.2836 18.1104 26.6919C18.1687 27.6211 18.2979 28.9586 18.5396 30.2336C18.7854 31.4419 19.1312 32.5752 19.6229 33.1669C19.6646 33.2127 19.7229 33.2544 19.7812 33.3002C20.5271 33.8961 22.2979 34.2002 24.0979 34.1711C25.8979 34.1419 27.6979 33.8086 28.5021 33.1127C28.5896 33.0544 28.6479 32.9794 28.6896 32.9211C28.9062 32.6461 29.0938 32.2377 29.2521 31.7586C28.9229 31.7294 28.5771 31.7044 28.2438 31.6877C26.0854 31.5419 23.8688 31.5711 22.2688 31.6419C21.8813 31.6586 21.5521 31.3544 21.5229 30.9627C21.5062 30.5544 21.8229 30.2211 22.2104 30.2044C23.8521 30.1336 26.1271 30.0919 28.3313 30.2336C28.7479 30.2627 29.1813 30.2919 29.5979 30.3377C29.9438 28.4627 30.0438 26.0961 30.0146 24.3544C30.0021 24.3377 30.0021 24.3086 30.0021 24.2794C30.0021 24.1377 30.0021 24.0044 30.0021 23.8752L29.9854 23.6836C29.2938 24.1377 28.3021 24.4711 27.1479 24.6752C26.0979 24.8627 24.8896 24.9502 23.6813 24.9627C22.4854 24.9794 21.2771 24.9044 20.2271 24.7294C18.1104 24.3961 16.5396 23.6419 16.4813 22.4086C16.4688 22.2752 16.4813 22.1627 16.4979 22.0461C16.6687 21.1461 17.5771 20.5211 18.8854 20.1294C19.9938 19.7919 21.4187 19.5919 22.8896 19.5169C24.6146 19.4169 26.4021 19.5044 27.7271 19.7502C28.1146 19.8211 28.3604 20.2002 28.2896 20.5919C28.2146 20.9836 27.8396 21.2461 27.4521 21.1711C26.2438 20.9544 24.5896 20.8669 22.9604 20.9544C21.6062 21.0294 20.2979 21.2169 19.3021 21.5211C18.4979 21.7544 17.9646 22.0294 17.9063 22.3044V22.3336C17.9354 22.7419 19.0021 23.0752 20.4563 23.3086C21.4187 23.4544 22.5438 23.5252 23.6646 23.5252C24.7896 23.5127 25.9104 23.4086 26.9062 23.2336C28.3896 22.9752 29.4979 22.5961 29.5563 22.1336C29.5563 22.0586 29.5688 22.0002 29.5854 21.9294C29.6396 21.7377 29.7146 21.5961 29.7979 21.4627C29.8438 21.4211 29.8854 21.3627 29.9438 21.3169C30.6646 20.7377 31.1229 21.1169 31.2979 22.2336C31.3271 22.3794 31.3396 22.5669 31.3688 22.7711C31.5854 22.6711 31.8021 22.5836 32.0313 22.5377C32.3896 22.4502 32.7646 22.4502 33.1271 22.5252C33.4688 22.5961 33.8146 22.7419 34.1021 22.9461C34.6938 23.3502 35.1563 23.9919 35.3271 24.8169C35.8188 27.1002 34.4063 28.2294 32.8521 29.4794C32.4188 29.8294 31.9563 30.2044 31.5563 30.5961C32.0146 30.6836 32.4771 30.7877 32.8938 30.9044C33.8896 31.1669 34.9813 31.5877 35.7729 32.1086C36.2479 32.4294 36.6229 32.7919 36.8396 33.2127C37.1146 33.7211 37.1396 34.2711 36.8396 34.8377C36.6813 35.1461 36.4229 35.4336 36.0479 35.7252C35.1563 36.4377 33.6271 36.9586 31.7438 37.3377C29.7563 37.7294 27.3229 37.9461 24.8479 37.9919C22.0688 38.0502 19.2188 37.8752 16.8563 37.5127C14.6271 37.1627 12.8104 36.6127 11.8188 35.8544C11.4146 35.5502 11.1271 35.2002 10.9688 34.8377C10.7396 34.3169 10.7396 33.7627 10.9688 33.2544C11.1563 32.8044 11.5021 32.3711 11.9896 32.0086C12.6979 31.5002 13.7062 31.0752 14.9438 30.8752C15.3313 30.8002 15.7062 31.0752 15.7646 31.4711C15.8354 31.8627 15.5604 32.2377 15.1729 32.2961C14.1646 32.4711 13.3729 32.7919 12.8396 33.1836C12.5646 33.3877 12.3646 33.6044 12.2771 33.8086C12.2229 33.9544 12.2229 34.1127 12.2771 34.2419C12.3521 34.3877 12.4813 34.5502 12.6813 34.6919C13.4729 35.3044 15.0729 35.7544 17.0729 36.0752C19.3479 36.4377 22.1104 36.5961 24.8188 36.5377C27.2063 36.4961 29.5563 36.2919 31.4688 35.9127C33.1396 35.5794 34.4646 35.1461 35.1688 34.5919C35.3688 34.4336 35.5021 34.2877 35.5729 34.1544C35.6146 34.0544 35.6146 33.9669 35.5729 33.8794C35.4854 33.6919 35.2688 33.5044 34.9813 33.3127C34.3354 32.8794 33.3979 32.5294 32.5354 32.2961C31.9563 32.1502 31.3396 32.0211 30.6646 31.9336C30.4479 32.7044 30.1729 33.3586 29.8271 33.8086C29.7146 33.9544 29.5854 34.1002 29.4271 34.2294C28.3438 35.1294 26.2146 35.5961 24.1146 35.6252C22.0271 35.6502 19.9104 35.2461 18.9021 34.4461C18.7563 34.3461 18.6271 34.2127 18.5271 34.1002C17.8521 33.2836 17.4188 31.9211 17.1313 30.5127C16.8729 29.1752 16.7396 27.7669 16.6688 26.7794Z"
                fill="#050505"
              />
            </g>
          </svg>
          <h4 className="text-textColor">$3 each</h4>
        </div>

        <div className="flex items-center gap-1">
          {buyType === "one-off" && (
            <div
              onClick={() => setCount(prevState => prevState + 10)}
              className="border cursor-pointer p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 12H18"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V6"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <h4 className="w-10 h-10 flex justify-center font-medium text-textDark items-center rounded-full border">
            {buyType === "one-off" && count}
            {buyType === "monthly" && 10}
          </h4>
          {buyType === "one-off" && (
            <div
              onClick={() =>
                setCount(prevState => (count > 10 ? prevState - 10 : prevState))
              }
              className={` border cursor-pointer p-2 rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.9199 12.75H7.91992C7.50992 12.75 7.16992 12.41 7.16992 12C7.16992 11.59 7.50992 11.25 7.91992 11.25H15.9199C16.3299 11.25 16.6699 11.59 16.6699 12C16.6699 12.41 16.3399 12.75 15.9199 12.75Z"
                  fill="#292D32"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <input
          type="text"
          // defaultValue={count}
          value={` $ ${count}`}
          readOnly
          className=" px-4 text-sm focus:outline-none placeholder:text-textDark font-semibold text-textDark bg-gray-50 w-full py-3 rounded-full border "
          name=""
          id=""
        />
      </div>
      <div>
        <textarea
          className="text-textColor focus:outline-none bg-gray-50 px-4 py-3 h-[220px] resize-none border rounded-xl w-full"
          name=""
          placeholder="Your work is amazing!!"
          id=""
        ></textarea>
      </div>
      <div className="">
        <button
          style={buttonStyles}
          className="w-full text-sm md:text-base  rounded-full  font-bold py-3 md:py-4"
        >
          Support Now
        </button>
      </div>
    </div>
  );
}

export default BuyCoffee;
