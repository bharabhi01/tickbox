import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Item from './pages/Item';
import ProtectedRoute from './ProtectedRoute';
import ViewGoals from './pages/ViewGoals';

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
            <Route
                path="/viewGoals"
                element={
                    <ProtectedRoute>
                        <ViewGoals />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;