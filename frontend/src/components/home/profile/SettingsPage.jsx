import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteEverything from "./DeleteEverything.jsx";

export default function Settings() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-8 relative">
            {/* Top Navigation Action */}
            <button
                onClick={() => navigate("/dashboard")}
                className="absolute top-8 right-8 text-zinc-400 hover:text-white text-sm bg-zinc-800/60 hover:bg-zinc-800 px-3.5 py-1.5 rounded-lg transition-colors border border-zinc-700/50"
            >
                Back to Dashboard
            </button>

            <div className="max-w-3xl mx-auto pt-4">

                <h1 className="text-2xl font-semibold mb-2">
                    Settings
                </h1>

                <p className="text-sm text-zinc-500 mb-8">
                    Manage your Lekh preferences and local data.
                </p>

                {/* Danger Zone */}
                <div className="pt-8 border-t border-zinc-800">
                    <h2 className="text-lg font-medium text-white mb-2">
                        Danger Zone
                    </h2>

                    <p className="text-sm text-zinc-500 mb-4">
                        Delete all notebooks, folders, and other data
                        stored locally in this browser.
                    </p>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="cursor-pointer px-4 py-2 rounded-lg text-xs font-medium bg-red-600/20 text-red-400 border border-red-600/30 hover:bg-red-600 hover:text-white transition-all"
                    >
                        Clear All Local Data
                    </button>
                </div>

                {showDeleteModal && (
                    <DeleteEverything
                        onClose={() => setShowDeleteModal(false)}
                    />
                )}

            </div>
        </div>
    );
}