import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import React from "react";
interface Props {
    children: React.ReactNode;
}
const layout = ({ children }: Props) => {
    return (
        <>
            <div className="p-2 body-content-no-footer">
                <Navbar />

                {children}
            </div>
            <Footer />
        </>
    );
};

export default layout;
