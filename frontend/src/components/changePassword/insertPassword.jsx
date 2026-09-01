import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../api/api.jsx";

function InsertPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            navigate("/insert-email");
        }
    }, [email, navigate]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        // if (password !== repeatPassword) {
        //     setError("Passwords do not match");
        //     return;
        // }

        setLoading(true);

        try {
            const response = await api.post("/auth/changePassword", {
                email: email,
                password: password,
                repeatPassword: repeatPassword,
            });

            setMessage("Password updated successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Failed to update password. Please try again.");
            }
            setLoading(false);
        }
    };

    if (!email) return null;

    return (
        <div className="h-full w-full flex flex-col justify-center bg-black px-6 py-10 sm:px-8 lg:px-12 xl:px-16 min-h-screen">
            <div className="mx-13 w-full max-w-110 sm:mx-auto sm:max-w-md">
                <div>
                    <h2 className="mt-1 text-2xl font-extrabold text-white">Reset Password</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter a new password for <span className="text-indigo-400 font-medium">{email}</span>.
                    </p>
                </div>

                <div className="mt-6">
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        {error && (
                            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="mb-4 rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                {message}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300">New Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                required
                                placeholder="Repeat new password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-all ${
                                loading ? "bg-indigo-400/50 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
                            }`}
                        >
                            {loading ? "Updating..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InsertPassword;