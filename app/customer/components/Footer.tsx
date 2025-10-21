import React from "react";

const Footer = () => {
    return (
        <div id="Footer" className="bg-[#2c2c2c] text-white p-4 a">
            <ul className="grid justify-center lg:justify-between text-center md:text-left lg:text-left sm-grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-2 mb-4">
                <li className="font-bold text-lg">ASWAD</li>
                <li>
                    <b className="font-bold text-lg">New to Aswad</b>
                    <ul>
                        <li>Subcribe</li>
                        <li>
                            <input
                                className="p-2           round border border-white"
                                type="text"
                            />
                            <button className="brand-color p-2">
                                Subcribe
                            </button>
                        </li>
                    </ul>
                </li>
                <li>
                    <b className="font-bold text-lg">Payment Methods</b>
                    <ul>
                        <li>
                            <i className="fa-solid fa-money-bill"></i>Opay
                        </li>
                        <li>
                            <i className="fa-brands fa-amazon-pay"></i>PayStack
                        </li>
                        <li>
                            <i className="fa-brands fa-google-pay ml-2"></i>
                            GooglePay
                        </li>
                    </ul>
                </li>
            </ul>
            <hr className="bg-gray-200 mb-2" />
            <ul className="grid justify-center lg:justify-between text-center md:text-left lg:text-left sm-grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-4 gap-2 mb-2">
                <li>
                    <span className="font-black text-lg">About Aswad</span>
                    <ul>
                        <li>About-us</li>
                        <li>Terms and Conditions</li>
                        <li>Privacy</li>
                    </ul>
                </li>
                <li>
                    <span className="font-black text-lg"> Need Helps </span>
                    <ul>
                        <li>
                            <i className="fa-solid fa-phone ml-2"></i>Contact-us
                        </li>
                        <li>
                            <i className="fa-solid fa-question ml-1"></i>Help
                            Center
                        </li>
                        <li>
                            <i className="fa-solid fa-envelope ml-1"></i>Chat
                            With Us
                        </li>
                    </ul>
                </li>
                <li>
                    <i className="fa-solid fa-truck-fast ml-1"></i>Payment on
                    Delivery
                </li>
            </ul>
        </div>
    );
};

export default Footer;
