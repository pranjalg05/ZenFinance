import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from "./utils/ProtectedRout.jsx";
import Accounts from "./pages/Accounts.jsx";
import AccountDetails from "./pages/AccountDetails.jsx";
import Stats from "./pages/Stats.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="/accounts" element={
                    <ProtectedRoute>
                        <Accounts/>
                    </ProtectedRoute>
                }/>
                <Route path="/accounts/:id" element={
                    <ProtectedRoute>
                        <AccountDetails/>
                    </ProtectedRoute>
                }/>
                <Route path="/stats" element={
                    <ProtectedRoute>
                        <Stats/>
                    </ProtectedRoute>
                }/>
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <Settings/>
                    </ProtectedRoute>
                }/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;