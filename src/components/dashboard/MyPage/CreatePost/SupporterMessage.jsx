function SupporterMessage() {
  return (
    <div className="bg-primaryLight/40 border-borderColor border rounded-xl p-4">
      <div className="flex items-center gap-4">
      <div className="size-10 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1729432536160-d4ba057b61d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <h4 className="font-semibold lg:text-base text-sm text-textDark flex-1">Love your podcast! Keep up the good work.
      </h4>
    </div>
    </div>
  );
}

export default SupporterMessage;
