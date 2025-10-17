import Navbar from "./customer/components/Navbar";
import Footer from "./customer/components/Footer";
import Image from "next/image";
import CustomerPage from "./customer/page.tsx";
export default function Home() {
    return (
        <>
            <div className="p-2 body-content-no-footer">
                <Navbar />

                <CustomerPage />
            </div>
            <Footer />
        </>
    );
}
