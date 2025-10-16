import React from "react";
import Link from "next/link";
const Cart = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="cart-item shadow md:col-span-9 p-2 h-auto">
                    <h3 className="font-bold text-md">CART (2)</h3>
                    <ul>
                        <hr className="bg-gray-200 my-2" />
                        <li>
                            <div className="product-imageAndPrice justify-between flex gap-2">
                                <div className="flex gap-2">
                                    <img
                                        src=".."
                                        alt="product-image"
                                        className="w-[150px] h-[100px] border"
                                    />
                                    <ul>
                                        <li>Nicky Shoe</li>
                                        <li className="font-bold text-sm">
                                            <i className="fa-solid fa-naira-sign"></i>
                                            10,000
                                        </li>
                                        <li className="text-sm text-red-700">
                                            Unit Left: 30
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <i className="fa-solid fa-naira-sign"></i>
                                    10,000
                                </div>
                            </div>
                            <div className="removeItemAndIncrease flex items-center justify-between">
                                <button className="bg-red-500 p-1 rounded mt-2 text-white">
                                    <i className="fa-solid fa-trash text-sm"></i>
                                    Remove
                                </button>
                                <div>
                                    (1)
                                    <button className="bg-red-500 text-center px-2 rounded mt-2 text-white">
                                        -
                                    </button>
                                    <button className="button-color text-center px-2 rounded mt-2 text-white">
                                        +
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <hr className="bg-gray-200 my-2" />
                        <li>
                            <div className="product-imageAndPrice justify-between flex gap-2">
                                <div className="flex gap-2">
                                    <img
                                        src=".."
                                        alt="product-image"
                                        className="w-[150px] h-[100px] border"
                                    />
                                    <ul>
                                        <li>Nicky Shoe</li>
                                        <li className="font-bold text-sm">
                                            <i className="fa-solid fa-naira-sign"></i>
                                            10,000
                                        </li>
                                        <li className="text-sm text-red-700">
                                            Unit Left: 30
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <i className="fa-solid fa-naira-sign"></i>
                                    10,000
                                </div>
                            </div>
                            <div className="removeItemAndIncrease flex items-center justify-between">
                                <button className="bg-red-500 p-1 rounded mt-2 text-white">
                                    <i className="fa-solid fa-trash text-sm"></i>
                                    Remove
                                </button>
                                <div>
                                    (1)
                                    <button className="bg-red-500 text-center px-2 rounded mt-2 text-white">
                                        -
                                    </button>
                                    <button className="button-color text-center px-2 rounded mt-2 text-white">
                                        +
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="sub-total shadow md:col-span-3 h-[150px] p-2">
                    <h3 className="font-bold">Cart Summary</h3>
                    <hr className="bg-gray-200 my-2" />
                    <div>
                        <ul className="flex justify-between">
                            <li>Sub-Total</li>
                            <li>
                                <i className="fa-solid fa-naira-sign"></i>10,000
                            </li>
                        </ul>
                        <Link
                            href="/order"
                            className="block button-color mt-4 text-white font-serif p-2 rounded"
                        >
                            Checkout
                            <span>
                                (<i className="fa-solid fa-naira-sign"></i>
                                10,000)
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div id="RecentView" className="text-white mb-2 py-2">
                <hr />
                <div className="flex brand-color justify-between items-center p-2 mb-2">
                    <div>Similar Product</div>
                    <div>See All</div>
                </div>
                <hr className="bg-gray-200 my-2" />
                <div className="product-card grid xs-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-gray-900 gap-2">
                    <article>
                        <figure className="product-card-image shadow flex-col gap-1">
                            <img
                                className="border h-[150px] w-auto"
                                src="logo"
                                alt="price card-image"
                            />
                            <figcaption className="p-2">
                                <div className="text-md text-gray-600">
                                    Skiter Kitto1
                                </div>
                                <div className="flex items-center text-sm text-black font-serif">
                                    <i className="fa-solid ml-0 fa-naira-sign text-black text-sm"></i>
                                    100,000
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure className="product-card-image shadow flex-col gap-1">
                            <img
                                className="border h-[150px] w-auto"
                                src="logo"
                                alt="price card-image"
                            />
                            <figcaption className="p-2">
                                <div>Skiter Kitto</div>
                                <div className="flex items-center text-sm text-black font-serif">
                                    <i className="fa-solid fa-naira-sign text-black text-sm"></i>
                                    100,000
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure className="product-card-image shadow flex-col gap-1">
                            <img
                                className="border h-[150px] w-auto"
                                src="logo"
                                alt="price card-image"
                            />
                            <figcaption className="p-2">
                                <div>Skiter Kitto</div>
                                <div className="flex items-center text-sm text-black font-serif">
                                    <i className="fa-solid fa-naira-sign text-black text-sm"></i>
                                    100,000
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure className="product-card-image shadow flex-col gap-1">
                            <img
                                className="border h-[150px] w-auto"
                                src="logo"
                                alt="price card-image"
                            />
                            <figcaption className="p-2">
                                <div>Skiter Kitto</div>
                                <div className="flex items-center text-sm text-black font-serif">
                                    <i className="fa-solid fa-naira-sign text-black text-sm"></i>
                                    100,000
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                </div>
            </div>
        </>
    );
};

export default Cart;
