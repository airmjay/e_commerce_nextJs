import React from "react";

const ProductSpecification = () => {
    return (
        <>
            <div className="mt-2 mb-2">
                <h1 className="text-md font-bold">PRODUCT</h1>
                <div className="grid grid-cols-1 gap-2 items-start md:grid-cols-12">
                    <div className="product-image md:col-span-8">
                        <figure className="shadow p-4 bg-gray-100 flex gap-2 items-center">
                            <img
                                src=".."
                                alt="product image"
                                className="h-[150px] w-[150px] border"
                            />
                            <figcaption className="flex flex-col gap-2">
                                <span>Skiter Nicky</span>
                                <span className="font-semibold tracking-tight">
                                    <i className="fa-solid fa-naira-sign"></i>
                                    10,000
                                </span>
                                <button className="p-2 rounded brand-color text-white">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    Add to Cart
                                </button>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="product-delivery-info p-4 md:col-span-4 shadow bg-gray-100">
                        <div>
                            <h2 className="text-sm font-bold font-mono">
                                Delivery Information
                            </h2>
                            <div>
                                <i className="fa-solid fa-truck-fast ml-1"></i>
                                ASWAD DELIVERY
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <h1 className="font-bold font-mono text-sm">
                                    <i className="fa-solid fa-location-dot"></i>
                                    Choose your Location
                                </h1>
                                <label htmlFor="state">Select State</label>
                                <select className="p-2" name="state" id="state">
                                    <option value="">State</option>
                                    <option value="kaduna">Kaduna</option>
                                    <option value="kano">Kano</option>
                                </select>
                                <label htmlFor="LGA">Select LGA</label>
                                <select className="p-2" name="LGA" id="LGA">
                                    <option value="">LGA</option>
                                    <option value="kaduna">Igabi</option>
                                    <option value="kano">Tarauni</option>
                                    <option value="kano">Fagge</option>
                                </select>
                                <div className="font-semibold text-sm tracking-tight">
                                    <span>Delivery fees: </span>
                                    <i className="fa-solid fa-naira-sign text-sm m-0"></i>
                                    1,000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                <div className="md:col-span-9">
                    <div className="shadow bg-gray-100 p-1">
                        <h2 id="del" className="font-bold text-sm">
                            Product Details
                        </h2>
                        <hr className="bg-gray-100 my-1" />
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ea numquam cumque facere omnis harum fuga
                            libero sit voluptatum ullam blanditiis quae eligendi
                            provident repudiandae, nam recusandae illum pariatur
                            quod vitae?
                        </div>
                        <h2 id="spec" className="font-bold text-sm mt-4">
                            Specification
                        </h2>
                        <hr className="bg-gray-100 my-1" />
                        <div>
                            <ul>
                                <li>Fasting: Long lasting shoes.</li>
                                <li>Material : Cotton.</li>
                                <li>Good For Sporting.</li>
                                <li>Make With Quality Material</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="h-[100px] shadow bg-gray-100 p-4 hidden md:block md:col-span-3">
                    <ul>
                        <li>
                            <a href="#del" className="underline">
                                Product Details
                            </a>
                        </li>
                        <li>
                            <a href="#spec" className="underline">
                                Specification
                            </a>
                        </li>
                    </ul>
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

export default ProductSpecification;
