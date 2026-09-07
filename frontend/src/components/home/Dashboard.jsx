import { useEffect, useState } from "react";
import LeftSideBar from "./LeftSideBar.jsx";
import NoteCardGrid from "./NoteCardGrid.jsx";
import DeleteFolderModal from "./folderOnDashboard/DeleteFolderModal.jsx";
import api from "../../api/api.jsx";
import {useNavigate} from "react-router-dom";
export default function Dashboard() {
    const navigate=useNavigate();

 const [notebooks,setNotebooks] = useState([]);
 const [folders,setFolder] = useState(["My Notes"]);

    const [activeFolder, setActiveFolder] = useState(null);
    const [folderToDelete, setFolderToDelete] = useState(null);

    useEffect(() => {
       const fetchNotes = async () => {
           try{

                   const email=localStorage.getItem('user_email');
                   const token=localStorage.getItem('jwt_token');
                   if(!email && !token){
                       navigate("/");
                   }

                   const response=await api.get("/notes")
               setNotebooks(response.data)
           }
           catch(error){
               console.error("Failed to fetch notebooks", error);
           }
       };
       fetchNotes();
    }, []);
    //
    // useEffect(() => {
    //     localStorage.setItem("user_folders", JSON.stringify(folders));
    // }, [folders]);

    // const handleCreateFolder = (folderName) => {
    //     if (!folderName || folders.includes(folderName)) return;
    //     setFolders(prev => [...prev, folderName]);
    // };
    //
    // const confirmDeleteFolder = () => {
    //     if (!folderToDelete) return;
    //     setFolders(prev => prev.filter(f => f !== folderToDelete));
    //     setNotebooks(prev => prev.map(n => n.folder === folderToDelete ? { ...n, folder: null } : n));
    //     if (activeFolder === folderToDelete) setActiveFolder(null);
    //     setFolderToDelete(null);
    // };

    return (
        <div className="flex h-screen w-screen bg-black text-white overflow-hidden">
            <LeftSideBar
                totalNotesCount={notebooks.length}

                      /* currently folder support is removed */

                // folders={folders}
                //  onCreateFolder={handleCreateFolder}
                // onDeleteClick={(folder) => setFolderToDelete(folder)}
                // onSelectFolder={(folder) => setActiveFolder(folder)}
                // activeFolder={activeFolder}
            />

            <main className="flex-1 flex flex-col bg-zinc-900 overflow-y-auto">
                <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
                    <span className="text-sm font-semibold text-zinc-300">
                        {activeFolder ? `Folder: ${activeFolder}` : "All Notes"}
                    </span>
                </header>

                <NoteCardGrid
                    notebooks={notebooks}
                    setNotebooks={setNotebooks}
                    activeFolder={activeFolder}
                />
            </main>

            {/*{folderToDelete && (*/}
            {/*    <DeleteFolderModal*/}
            {/*        folderName={folderToDelete}*/}
            {/*        onDelete={confirmDeleteFolder}*/}
            {/*        onClose={() => setFolderToDelete(null)}*/}
            {/*    />*/}
            {/*)}*/}

        </div>
    );
}