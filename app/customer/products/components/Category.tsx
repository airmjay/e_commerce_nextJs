import React from "react";

const Category = () => {
    return (
        <>
            <div id="RecentView" className="text-white mb-2">
                <div className="flex brand-color justify-between items-center p-2 mb-2">
                    <div>Product</div>
                    <div> Phones </div>
                </div>
                <hr className="bg-gray-200 my-2" />
                <div className="product-card grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-gray-900 gap-2">
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
            <div className="flex justify-center">
                <button className="px-2 bg-green-500 text-white">
                    Previous
                </button>
                <button className="px-2 bg-blue-500 text-white">1</button>
                <button className="px-2 bg-blue-500 text-white">2</button>
                <button className="px-2 bg-blue-500 text-white">3</button>
                <span className="px-2 bg-blue-500 text-white">....</span>
                <button className="px-2 bg-blue-500 text-white">123</button>
                <button className="px-2 bg-green-500 text-white">Next</button>
            </div>
        </>
    );
};

export default Category;
