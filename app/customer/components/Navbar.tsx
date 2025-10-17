import React from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
    return (
        // <!-- header start -->
        <nav className="grid grid-cols-12 items-center justify-between mb-2 relative">
            <div className="col-span-1 menuOpenSmallScreen text-black block md:hidden">
                <i className="fa-solid fa-bars"></i>
            </div>
            <Link
                href="/"
                className="col-span-5 md:col-span-3 flex justify-start items-center block font-bold text-lg text-gray-900"
            >
                <Image
                    src="/images/crop.png"
                    className="w-[40px] mr-1 h-[40px]"
                    alt="logo iamge"
                    width={500}
                    height={500}
                />
                 ASWAD
            </Link>
            <div className="w-full order-3 md:order-0 col-span-12 md:col-span-6 flex">
                <div className="w-full md:w-full border border-gray-400 p-2">
                    <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                    <input
                        type="search"
                        className="bg-transparent outline-0 text-gray-800"
                        placeholder="Search for product"
                    />
                </div>
                <button className="brand-color p-2 text-white">Search</button>
            </div>
            <div className="col-span-5 md:col-span-3 justify-end accountHelpCartDiv text-black flex gap-1">
                <div className="accountSection hidden md:flex">
                    <div className="flex items-center">
                        <i className="fa-solid fa-user brand-text-color"></i>
                        <span>Account</span>
                        <i className="fa-solid fa-chevron-down text-sm"></i>
                    </div>
                    <ul className="hidden absolute brand-color text-gray-200 shadow border top-4xl p-2">
                        <li>Login</li>
                        <li>Sign Out</li>
                    </ul>
                </div>
                <div className="helpSection hidden md:flex">
                    <div className="flex items-center">
                        <i className="fa-solid fa-question brand-text-color"></i>
                        <span>Help</span>
                    </div>
                </div>
                <div className="cartSection">
                    <Link href="/customer/cart" className="flex items-center">
                        <i className="fa-solid fa-cart-shopping brand-text-color"></i>
                        <span className="hidden md:inline">Cart</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
