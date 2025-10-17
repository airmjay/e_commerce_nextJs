const Dashboard = () => {
    return (
        <div className="col-span-9 p-4">
            <div className="dashboard flex justify-between items-center">
                <ul className="flex gap-1 items-center">
                    <li>
                        <div className="w-[40px] h-[40px] text-center flex items-center justify-centers text-gray-200 bg-blue-600 p-2">
                            <i className="fa-solid fa-home "></i>
                        </div>
                    </li>
                    <li className="text-gray-500">Dashboard</li>
                </ul>
                <ul className="flex gap-1 items-center">
                    <li className="text-gray-500">Overview</li>
                    <li className="button-color flex items-center justify-center rounded-full w-[20px] h-[20px] text-white">
                        +
                    </li>
                </ul>
            </div>
            <hr className="bg-black my-2" />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
                <div className="col-span-4 shadow p-4 bg-blue-600">
                    <ul className="text-gray-100 flex gap-2 justify-between">
                        <li>Total Order</li>
                        <li>
                            <div className="bg-white text-black w-[40px] h-[40px] rounded-full items-center flex justify-center">
                                <i className="fa-solid fa-shopping-cart"></i>
                            </div>
                        </li>
                    </ul>
                    <span className="mt-2 block">41,000</span>
                </div>
                <div className="col-span-4 shadow p-4 bg-green-400">
                    <ul className="text-gray-100 flex gap-2 justify-between">
                        <li>Total Sales</li>
                        <li>
                            <div className="bg-white text-black w-[40px] h-[40px] rounded-full items-center flex justify-center">
                                <i className="fa-brands  fa-amazon-pay"></i>
                            </div>
                        </li>
                    </ul>
                    <span className="mt-2 block">
                        <i className="fa-solid fa-naira-sign"></i>41,000
                    </span>
                </div>
                <div className="col-span-4 shadow p-4 bg-orange-400">
                    <ul className="text-gray-100 flex gap-2 justify-between">
                        <li>Total Users</li>
                        <li>
                            <div className="bg-white text-black w-[40px] h-[40px] rounded-full items-center flex justify-center">
                                <i className="fa-solid fa-users"></i>
                            </div>
                        </li>
                    </ul>
                    <span className="mt-2 block">41,000</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-12 mt-2">
                <div className="col-span-7 shadow bg-white p-2">Bar Chart</div>
                <div className="col-span-5 shadow bg-white p-2">Pie Chart</div>
            </div>
        </div>
    );
};

export default Dashboard;
