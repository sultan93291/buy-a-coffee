

function PostCard() {
  return (
    <div className="lg:flex-row flex flex-col gap-4 lg:p-6 p-4 bg-gray-50 rounded-xl h-full">
    <div className="lg:w-3/12 w-full overflow-hidden h-[300px]  lg:h-full rounded-xl">
      <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    </div>
    <div className="flex flex-col h-fit lg:h-full">
      <h3 className="text-textDark font-bold pb-3 text-xl">2024 California Classic Summer League</h3>
      <p className="text-textColor ">Bryce McGowens scores a game-high 20 points and Jake Stephens adds 14 poin ...more...</p>
    </div>
  </div>
  )
}

export default PostCard