import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("user_email") || "example@gmail.com";
    const userName = localStorage.getItem("user_name") || "User Name";
    const [isDriveConnected, setIsDriveConnected] = useState(false);

    // Correctly placed at the top-level of the component
    useEffect(() => {
        const connectedStatus = localStorage.getItem("isDriveConnected");
        if (connectedStatus === "yes") {
            setIsDriveConnected(true);
        }
    }, []);

    return (
        <div className="flex h-screen w-screen bg-black text-white overflow-hidden justify-center items-center p-6">
            <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-2xl p-8 shadow-2xl relative">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer absolute top-6 right-6 text-zinc-400 hover:text-white text-sm bg-zinc-900 px-3 py-1 rounded-lg transition-colors"
                >
                    Back to Dashboard
                </button>

                <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                        AR
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{userName}</h1>
                        <p className="text-sm text-zinc-500">{userEmail}</p>
                    </div>
                </div>

                <div className="space-y-4 border-t border-zinc-800 pt-6 text-sm">
                    <div className="flex justify-between py-2 border-b border-zinc-900">
                        <span className="text-zinc-500">Email</span>
                        <span className="text-zinc-200">{userEmail}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-900">
                        <span className="text-zinc-500">Role</span>
                        <span className="text-zinc-200">User</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-900 items-center">
                        <span className="text-zinc-500">Cloud Storage Sync</span>
                        {isDriveConnected ? (
                            <span className="text-emerald-400 flex items-center gap-1.5 text-sm">
                                ● Google Drive Connected
                            </span>
                        ) : (
                            <span className="text-zinc-400 text-sm">
                                Not Connected
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}