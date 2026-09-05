import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white hover:bg-indigo-500 transition-colors cursor-pointer shadow-md"
            >
                L
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 text-sm text-zinc-300">
                    <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="font-medium text-white">Anuj Rewar</p>
                        <p className="text-xs text-zinc-500 truncate">anuj@iiitmanipur.ac.in</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-zinc-800 hover:text-white transition-colors">User Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-zinc-800 hover:text-white transition-colors">Settings</Link>
                    <div className="border-t border-zinc-800 my-1"></div>
                    <button
                        onClick={() => alert("Logged out")}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors cursor-pointer"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}