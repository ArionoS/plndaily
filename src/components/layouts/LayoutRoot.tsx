import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; // <-- your sidebar component
import { Outlet } from "react-router-dom";

export default function LayoutRoot() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <aside
                className={`fixed top-0 left-0 h-full z-30 bg-white border-r transition-all duration-300
        ${isSidebarCollapsed ? "-ml-64" : "ml-0"}
        lg:${isSidebarCollapsed ? "w-0" : "w-64"}
      `}
            >
                <Sidebar />
            </aside>

            {/* NAVBAR */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 
        ${isSidebarCollapsed ? "lg:ml-0" : "lg:ml-64"}
      `}
            >
                <Navbar
                    sidebarCollapsed={isSidebarCollapsed}
                    onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
            </div>

            {/* PAGE CONTENT */}
            <main
                className={`pt-20 transition-all duration-300 
        ${isSidebarCollapsed ? "lg:ml-0" : "lg:ml-64"}
      `}
            >
                <Outlet />
            </main>

        </div>
    );
}
