import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import "../globals.css";
interface Props {
    children: React.ReactNode;
}
const layout = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="/font/css/all.css"></link>
            </head>
            <body>
                <NavBar />

                <div className="grid grid-cols-1 md:grid-cols-12">
                    <SideBar />
                    {children}
                </div>
            </body>
        </html>
    );
};

export default layout;
