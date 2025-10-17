const NavBar = () => {
    return (
        <nav className="grid grid-cols-12 gap-2 justify-between p-2 bg-white shadow items-center">
            <div className="logo col-span-2 w-[50px] h-[50px]">
                <img src="../images/shop.png" className="w-[100%]" alt="" />
            </div>
            <div className="search-bar col-span-8">
                <div className="flex">
                    <div className="flex items-center w-auto md:w-full border p-2">
                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                        <input
                            type="search"
                            className="bg-transparent outline-0 text-gray-800"
                            placeholder="Search for product"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex justify-end">
                <button>
                    <i className="text-gray-500 fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
