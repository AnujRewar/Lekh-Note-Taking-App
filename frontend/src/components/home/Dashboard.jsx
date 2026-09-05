import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import LeftSide from "../login/LeftSide.jsx";
import LeftSideBar from "./LeftSideBar.jsx";
import NoteCardGrid from "./NoteCardGrid.jsx";
import SearchBar from "./SearchBar.jsx";
function Dashboard() {


    const navigate = useNavigate();
    const location = useLocation();
    const email=location.state?.email;

    // useEffect(() => {
    //     if(!email){
    //         navigate("/");
    //     }
    // },[email,navigate]);


    return (
        <div className="flex h-screen w-screen bg-black text-white overflow-hidden">

            {/* Left Sidebar */}
              <LeftSideBar/>
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col bg-zinc-900 overflow-y-auto">

                {/* Top Header Bar */}
                <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
                    <h1 className="text-xl font-bold tracking-tight">All Notes</h1>

                    <div className="flex items-center space-x-4">
                        {/* Search Bar */}
                        <SearchBar/>

                        {/* New Notebook Button */}
                        {/*<button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all flex items-center space-x-2 cursor-pointer shadow-lg shadow-indigo-600/20">*/}
                        {/*    <span>+ New Notebook</span>*/}
                        {/*</button>*/}
                    </div>
                </header>

                {/* Notebooks Grid */}
            <NoteCardGrid/>
            </main>
        </div>
    );
}



export default Dashboard;