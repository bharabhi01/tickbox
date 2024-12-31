import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Item from './pages/Item';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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