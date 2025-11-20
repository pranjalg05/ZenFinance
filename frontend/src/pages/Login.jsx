import {useState} from "react";
import api from "../api/axios";
import {useNavigate} from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await api.post("/user/login",
                {username: username, password: password}
            )

            localStorage.setItem("token", res.data.token);

            navigate("/");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>



                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 cursor-pointer hover:underline ml-1"
                    >
            Register
          </span>
                </p>
            </div>
        </div>
    )


}

export default Login;