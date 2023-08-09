import React from 'react';
import Sidebar from '../../Components/Sidebar';
import DashboardPage from './Dashboard';
import { Route, Routes } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div>
            <Sidebar />
            <div>
                <Routes>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPage;
