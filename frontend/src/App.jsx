import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from "./utils/ProtectedRout.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;