

const SideBar = () => {
  return (
  <>
            <div
                className="overflow-y-scroll col-span-3 hidden md:block p-2 shadow bg-white min-h-[100vh]">
                <div className="profile-image flex items-center gap-1">
                    <div
                        className="card-image rounded-full bg-black h-[50px] w-[50px]"
                    ></div>
                    <div className="user-name">
                        <h3 className="text-gray-400">Abdulmajeed</h3>
                    </div>
                    <div className="user-star">
                        <i className="text-lg fa-solid fa-star text-green-400"></i>
                    </div>
                </div>
                <hr className="text-gray-200 my-2" />
                
                <ul className="p-2 text-gray-500 flex flex-col gap-2">
                    <li className="">
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span> Dashboard </span>
                            <i className="fa-solid fa-home"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span>Users</span> <i className="fa-solid fa-users"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span>Orders </span>
                            <i className="fa-solid fa-shopping-cart"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span>Categories</span>
                            <i className="fa-solid fa-tags"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span>Products</span>
                            <i className="fa-solid fa-gift"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span>Settings</span>
                            <i className="fa-solid fa-gears"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="hover:text-[17px] hover:text-gray-400 cursor-pointer border-b border-gray-100 pb-1 flex justify-between items-center"
                        >
                            <span>Logout</span>
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </li>
                </ul>
            </div>
            </>
  )
}

export default SideBar