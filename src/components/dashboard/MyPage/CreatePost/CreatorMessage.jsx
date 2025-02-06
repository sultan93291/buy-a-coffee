function CreatorMessage() {
  return (
    <div className="bg-primaryLight/40 border-borderColor border rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1721332149274-586f2604884d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <h4 className="font-semibold flex-1 lg:text-base text-sm text-textDark">Thanks. Stay connected.</h4>
      </div>
    </div>
  );
}

export default CreatorMessage;
