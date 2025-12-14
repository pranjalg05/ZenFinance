import DashboardLayout from "../layouts/DashboardLayout";
import {useState} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";

function Settings() {

    const [username, setUsername] = useState(localStorage.getItem("username") || "username");
    const email = localStorage.getItem("email") || "email";
    const [newUsername, setNewUsername] = useState(username);
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleReset = () => {
        if (username !== newUsername) {
            setNewUsername(username);
        }
        setUsernameError("");
    }

    const handleUpdateUsername = async () => {
        setUsernameError("");
        if(newUsername.length < 3 || newUsername.length > 15) {
            setUsernameError("Username must be between 3 and 15 characters");
            return;
        }
        if(isSubmitting) return;
        setIsSubmitting(true);
        try {
            await api.post("/dashboard/update-user", {username: newUsername});
            localStorage.setItem("username", newUsername);
            setUsername(newUsername);
        } catch (e) {
            setUsernameError("Username already exists");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleUpdatePassword = async () => {
        setPasswordError("");
        if(password.length < 3) {
            setPasswordError("Password must be at least 3 characters long");
            return;
        }
        if (!oldPassword) {
            setPasswordError("Current password is required");
            return;
        }
        if(isSubmitting) return;
        setIsSubmitting(true);
        try {
            await api.post("/dashboard/update-password", {oldPassword: oldPassword, newPassword: password});
        } catch (e) {
            setPasswordError("Incorrect password");
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <DashboardLayout>
            <h3 className="text-xl font-bold mb-4">Settings</h3>
            <div className="bg-white p-6 rounded-xl drop-shadow">
                <h3 className="text-xl font-bold mb-4">Account</h3>
                <p className="text-gray-500 mb-6">
                    Edit your account details
                </p>

                <div className="mb-4">
                    <label className="block mb-1 text-xl font-medium  text-gray-700">Username</label>
                    <input type="text"
                           className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                           value={newUsername} onChange={(e) => setNewUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-xl font-medium  text-gray-700">Email</label>
                    <input type="email"
                           className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                           disabled={true} value={email}
                    />
                </div>
                <p className="text-red-500 text-sm text-center mb-2">{usernameError}</p>

                <div className="flex items-center justify-center gap-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            disabled={username === newUsername || isSubmitting}
                            onClick={handleUpdateUsername}
                    >Save Changes</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            onClick={handleReset}
                    >Reset</button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl drop-shadow mt-6">
                <h3 className="text-xl font-bold mb-4">Security</h3>
                <p className="text-gray-500 mb-6">
                    Change your password
                </p>
                <div className="mb-4">
                    <label className="block mb-1 text-xl font-medium  text-gray-700">Current Password</label>
                    <input type="password"
                           className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                           value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-xl font-medium  text-gray-700">New Password</label>
                    <input type="password"
                           className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                           value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="text-red-500 text-sm text-center mb-2">{passwordError}</p>
                <div className="flex items-center justify-center gap-6">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            disabled={isSubmitting}
                            onClick={handleUpdatePassword}
                    >Save Changes</button>
                </div>
            </div>
            <div className={"justify-end mt-2 "}>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        onClick={() => {
                            localStorage.clear()
                            navigate("/login")
                        }}
                >Logout</button>
            </div>
        </DashboardLayout>
    )
}

export default Settings;