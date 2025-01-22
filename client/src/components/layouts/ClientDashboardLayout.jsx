import React from "react";
import { Outlet } from "react-router-dom";
import ClientNavbar from "../navbars/ClientNavbar"; // Ensure this is correctly imported
import Footer from "../footers/Footer"; // Add your footer component if available

const ClientDashboardLayout = () => {
    return (
        <div>
            <ClientNavbar />
            <main>
                <Outlet /> {/* Renders child routes like Dashboard or JobPostPage */}
            </main>
            <Footer />
        </div>
    );
};

export default ClientDashboardLayout;