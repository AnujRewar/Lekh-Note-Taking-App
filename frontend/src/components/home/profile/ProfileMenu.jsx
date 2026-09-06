import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("user_email") || "user@example.com";
    const userName=localStorage.getItem("user_name")|| "User";

//extract initials for avatar
    const getInitials = (email) => {
        const namePart = email.split("@")[0];
        if (namePart.includes(".")) {
            const parts = namePart.split(".");
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return namePart.slice(0, 2).toUpperCase();
    };
    const userInitials = getInitials(userEmail);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_email");
        navigate("/");
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm hover:ring-2 hover:ring-indigo-400 transition-all focus:outline-none"
            >
                {userInitials}
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-1.5 z-50 text-sm">
                    <div className="px-4 py-2 border-b border-zinc-800">
                        <p className="font-medium text-white">{userName}</p>
                        <p className="text-xs text-zinc-500 truncate">{userEmail}</p>
                    </div>
                    <button
                        onClick={() => { setIsOpen(false); navigate("/profile"); }}
                        className="cursor-pointer w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => { setIsOpen(false); navigate("/settings"); }}
                        className="cursor-pointer w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                        Settings
                    </button>
                    <div className="border-t border-zinc-800 my-1"></div>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer w-full text-left px-4 py-2 text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}