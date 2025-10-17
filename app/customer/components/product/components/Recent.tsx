const Recent = () => {
    return (
    <div id="RecentView" className="text-white mb-2">
        <div className="flex brand-color justify-between items-center p-2 mb-2">
            <div>Recent Product</div>
            <div>See All</div>
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
    );
};

export default Recent;
