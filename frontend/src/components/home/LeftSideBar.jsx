import {Link} from 'react-router-dom'
import ProfileMenu from "./ProfileMenu.jsx";

function LeftSideBar() {
    return(
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between p-4 select-none">
        <div>
            {/* App Brand / User Profile */}
            <div className="flex items-center space-x-3 px-2 mb-8">
                <ProfileMenu />
                <span className="font-semibold tracking-wide text-lg text-white">Lekh</span>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
                <SidebarLink to="/dashboard" label="All Notes" active={true} count="2" />
                <SidebarLink to="/dashboard/starred" label="Starred" count="0" />
                <SidebarLink to="/dashboard/unfiled" label="Unfiled" count="0" />
                <SidebarLink to="/dashboard/trash" label="Trash" count="0" />
            </nav>

            {/* Folders Section */}
            <div className="mt-8">
                <div className="flex items-center justify-between px-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    <span>Folders</span>
                    <button className="hover:text-white transition-colors">+</button>
                </div>
                <div className="space-y-1 text-sm text-zinc-400">
                    <div className="px-2 py-1.5 hover:bg-zinc-900 rounded-md cursor-pointer transition-colors">📁 My Notes</div>
                    <div className="px-2 py-1.5 hover:bg-zinc-900 rounded-md cursor-pointer transition-colors">📁 Gate Preparation</div>
                </div>
            </div>
        </div>

        {/* Footer Status or Google Drive Sync status */}
        <div className="px-2 py-3 border-t border-zinc-800/60 text-xs text-zinc-500 flex items-center justify-between">
            <span>Google Drive: Synced</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
        </div>
    </aside>
    );
}
function SidebarLink({ to, label, active, count }) {
    return (
        <Link
            to={to}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-indigo-600/10 text-indigo-400" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            }`}
        >
            <span>{label}</span>
            {count && <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full">{count}</span>}
        </Link>
    );
}
export default LeftSideBar;