import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProfileMenu from "./profile/ProfileMenu.jsx";

export default function LeftSideBar({ totalNotesCount = 0, folders = [], onCreateFolder, onDeleteClick, onSelectFolder, activeFolder }) {
    const location = useLocation();
    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [folderInput, setFolderInput] = useState("");

    const handleFolderSubmit = (e) => {
        e.preventDefault();
        if (!folderInput.trim()) return;
        onCreateFolder(folderInput.trim());
        setFolderInput("");
        setIsAddingFolder(false);
    };

    return (
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between p-4 select-none shrink-0">
            <div>
                {/* App Brand / User Profile */}
                <div className="flex items-center space-x-3 px-2 mb-8">
                    <ProfileMenu />
                    <span className="font-semibold tracking-wide text-lg text-white">Lekh</span>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    <SidebarLink
                        to="/dashboard"
                        label="All Notes"
                        active={location.pathname === "/dashboard" && activeFolder === null}
                        count={totalNotesCount.toString()}
                        onClick={() => onSelectFolder(null)}
                    />
                </nav>

                {/* Folders Section */}
                {/*<div className="mt-8">*/}
                {/*    <div className="flex items-center justify-between px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">*/}
                {/*        <span>Folders</span>*/}
                {/*        <button*/}
                {/*            onClick={() => setIsAddingFolder(prev => !prev)}*/}
                {/*            className="hover:text-white transition-colors text-lg font-light px-1"*/}
                {/*            title="Add Folder"*/}
                {/*        >*/}
                {/*            +*/}
                {/*        </button>*/}
                {/*    </div>*/}

                {/*    {isAddingFolder && (*/}
                {/*        <form onSubmit={handleFolderSubmit} className="px-2 mb-2">*/}
                {/*            <input*/}
                {/*                type="text"*/}
                {/*                placeholder="New folder name..."*/}
                {/*                value={folderInput}*/}
                {/*                onChange={(e) => setFolderInput(e.target.value)}*/}
                {/*                autoFocus*/}
                {/*                className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"*/}
                {/*            />*/}
                {/*        </form>*/}
                {/*    )}*/}

                {/*    <div className="space-y-1 text-sm text-zinc-400">*/}
                {/*        {folders.map((folder) => (*/}
                {/*            <div*/}
                {/*                key={folder}*/}
                {/*                onClick={() => onSelectFolder(folder)}*/}
                {/*                className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors group ${activeFolder === folder ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900'}`}*/}
                {/*            >*/}
                {/*                <span className="truncate">📁 {folder}</span>*/}
                {/*                <button*/}
                {/*                    onClick={(e) => {*/}
                {/*                        e.stopPropagation();*/}
                {/*                        onDeleteClick(folder);*/}
                {/*                    }}*/}
                {/*                    className="opacity-0 group-hover:opacity-100 text-xs text-red-400 hover:text-red-300 transition-opacity px-1"*/}
                {/*                    title="Delete Folder"*/}
                {/*                >*/}
                {/*                    ✕*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            {/*/!* Footer Sync Status *!/*/}
            {/*<div className="px-2 py-3 border-t border-zinc-800/60 text-xs text-zinc-500 flex items-center justify-between">*/}
            {/*    <span>Google Drive: Synced</span>*/}
            {/*    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>*/}
            {/*</div>*/}
        </aside>
    );
}

function SidebarLink({ to, label, active, count, onClick }) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
            <span>{label}</span>
            {count && <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">{count}</span>}
        </Link>
    );
}