// components/dashboard/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from '../Header/Header';

const DashboardLayout = () => {
    return (
        <div className="AppGlass">
             <Header />
            <Sidebar />
           
            <main>
                {/* Outlet pour afficher les composants enfants */}
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;