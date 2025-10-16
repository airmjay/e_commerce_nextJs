import React from "react";
import Link from "next/link";
const Order = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="cart-item shadow md:col-span-9 p-2 h-auto">
                    <h3 className="font-bold text-md">ORDER (2)</h3>
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
                                    </ul>
                                </div>

                                <div>
                                    <i className="fa-solid fa-naira-sign"></i>
                                    10,000
                                </div>
                            </div>
                            <div className="removeItemAndIncrease flex items-center justify-between">
                                <Link
                                    href="/track"
                                    className="bg-blue-600 p-1 rounded mt-2 text-white"
                                >
                                    <i className="fa-solid fa-location-dot text-sm"></i>
                                    Track Order
                                </Link>
                                <div>
                                    <button className="bg-red-500 text-center p-1 rounded mt-2 text-white">
                                        <i className="fa-solid fa-xmark"></i> Cancel
                                        Order
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
                                    </ul>
                                </div>

                                <div>
                                    <i className="fa-solid fa-naira-sign"></i>
                                    10,000
                                </div>
                            </div>
                            <div className="removeItemAndIncrease flex items-center justify-between">
                                <a
                                    href="track.html"
                                    className="bg-blue-600 p-1 rounded mt-2 text-white"
                                >
                                    <i className="fa-solid fa-location-dot text-sm"></i>
                                    Track Order
                                </a>
                                <div>
                                    <button className="bg-red-500 text-center p-1 rounded mt-2 text-white">
                                        <i className="fa-solid fa-xmark"></i> Cancel
                                        Order
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="sub-total shadow md:col-span-3 h-[150px] p-2">
                    <h3 className="font-bold">Order Summary</h3>
                    <hr className="bg-gray-200 my-2" />
                    <div>
                        <ul className="flex justify-between">
                            <li>Sub-Total</li>
                            <li>
                                <i className="fa-solid fa-naira-sign"></i>10,000
                            </li>
                        </ul>
                        <hr className="bg-gray-200 my-2" />
                        <span className="font-bold text-green-600">
                            <i className="fa-solid fa-money-bill"></i>Payment
                            Status: <br />
                            <i className="fa-solid fa-truck-fast"></i> Pay On
                            Delivery
                        </span>
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

export default Order;
