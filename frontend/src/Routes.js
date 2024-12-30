import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Item from './pages/Item';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/goals"
                element={
                    <ProtectedRoute>
                        <Item />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;