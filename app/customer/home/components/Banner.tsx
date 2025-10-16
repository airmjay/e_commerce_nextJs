import React from "react";

const Banner = () => {
    return (
        <div id="Banner" className="flex gap-2 mb-2">
            <div id="BannerSidebar" className="hidden md:block w-[20vw]">
                <ul className="text-md hidden">
                    <li>Login</li>
                    <li>SignOut</li>
                    <li>SignUp</li>
                </ul>
                <hr className="border my-1 bg-gray-400" />
                <ul className="border p-2 flex-col space-y-4">
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-vest-patches"></i>Fashion
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-microchip"></i> Technology
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-basketball"></i>Sporting
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-chair"></i>Furniture
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-plug"></i>Electronic
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-cart-shopping"></i>Order
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-car"></i>Automatic
                    </li>
                    <li className="hover:text-gray-600 cursor-pointer">
                        <i className="fa-solid fa-kitchen-set"></i> Kitchen
                    </li>
                </ul>
            </div>
            <div
                id="BannerSlider"
                className="w-full md:w-[80vw] bg-red-400 h-auto min-h-[200px]"
            ></div>
        </div>
    );
};

export default Banner;
