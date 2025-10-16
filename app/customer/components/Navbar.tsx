import React from "react";
import Link from "next/link";
const Navbar = () => {
    return (
        // <!-- header start -->
        <nav className="flex items-center justify-between mb-2 relative">
            <Link href="/" className="block font-bold text-lg text-gray-900">
                A<span className="hidden md:inline-block">SWAD</span>
            </Link>
            <div className="flex">
                <div className="w-auto md:w-full border rounded p-2">
                    <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                    <input
                        type="search"
                        className="bg-transparent outline-0 text-gray-800"
                        placeholder="Search for product"
                    />
                </div>
                <button className="brand-color p-2 text-white">Search</button>
            </div>
            <div className="accountHelpCartDiv text-black flex gap-1">
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
                    <Link href="/cart" className="flex items-center">
                        <i className="fa-solid fa-cart-shopping brand-text-color"></i>
                        <span className="hidden md:inline">Cart</span>
                    </Link>
                </div>
            </div>
            <div className="menuOpenSmallScreen text-black block md:hidden">
                <i className="fa-solid fa-bars"></i>
            </div>
        </nav>
    );
};

export default Navbar;
