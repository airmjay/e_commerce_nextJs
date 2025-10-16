import React from "react";
import Link from "next/link";
const Track = () => {
    return (
        <div
            style={{
                background: "url(images/order.png)",
                backgroundPosition: "top-center",
                backgroundSize: "100vw 100vh",
                backgroundRepeat: "no-repeat",
                objectFit: "contain"
            }}
            className="bg-gray-100 relative h-[100vh]"
        >
            <div className="background-design"></div>
            <div className="p-4 z-[10000] relative">
                <Link href="/order" className="text-blue-700 underline">
                    Back to order
                </Link>
                <h2 className="font-bold text-lg">Tracking Status</h2>
                <div className="relative overflow-x-scroll">
                    <table className="shadow border text-left table table-auto text-gray-500 uppercase text-sm">
                        <thead>
                            <tr className="bg-gray-900 opacity-80 text-white">
                                <th scope="col" className="px-6 py-2">
                                    Items
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Order_id
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Tracking_id
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Estimated Delivery Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-gray-200 bg-gray-700 text-white">
                                <td
                                    scope="col"
                                    className="px-6 py-2 font-medium"
                                >
                                    Cros Shoe
                                </td>
                                <td
                                    scope="col"
                                    className="px-6 py-2 font-medium"
                                >
                                    10337373FV
                                </td>
                                <td
                                    scope="col"
                                    className="px-6 py-2 font-medium"
                                >
                                    Track-7373646343
                                </td>
                                <td
                                    scope="col"
                                    className="px-6 py-2 font-medium"
                                >
                                    Shipped
                                </td>
                                <td
                                    scope="col"
                                    className="px-6 py-2 font-medium"
                                >
                                    10<sup>th</sup> September 2025
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Track;
