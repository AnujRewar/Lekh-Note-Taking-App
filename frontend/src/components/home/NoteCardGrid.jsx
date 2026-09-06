import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteNotebook from "./notebook/DeleteNotebook.jsx";
import CreateNotebook from "./notebook/CreateNotebook.jsx";
import RenameNotebook from "./notebook/RenameNotebook.jsx";
import SearchBar from "./SearchBar.jsx";

export default function NoteCardGrid({ notebooks, setNotebooks }) {
    const navigate = useNavigate();

    const [deleteNotebookId, setDeleteNotebookId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notebookTitle, setNotebookTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleCreateNotebook = (e) => {
        e.preventDefault();
        if (!notebookTitle.trim()) return;

        const newId = Date.now().toString();
        const colors = ["bg-indigo-900", "bg-blue-900", "bg-emerald-900", "bg-purple-900", "bg-rose-900"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newNotebook = {
            id: newId,
            title: notebookTitle.trim(),
            date: new Date().toISOString().split("T")[0],
            coverColor: randomColor
        };

        setNotebooks(prev => [newNotebook, ...prev]);
        setNotebookTitle("");
        setIsModalOpen(false);
        navigate(`/note/${newId}`);
    };

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        setDeleteNotebookId(id);
    };

    const confirmDeleteNotebook = () => {
        setNotebooks(prev => prev.filter(notebook => notebook.id !== deleteNotebookId));
        localStorage.removeItem(`notebook_${deleteNotebookId}`);
        setDeleteNotebookId(null);
    };

    const handleRenameSubmit = (e, id) => {
        e.stopPropagation();
        if (!editTitle.trim()) return;
        setNotebooks(prev => prev.map(note =>
            note.id === id ? { ...note, title: editTitle.trim() } : note
        ));
        setEditingId(null);
        setEditTitle("");
    };

    const filteredNotebooks = notebooks.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 flex-1 overflow-y-auto bg-zinc-900 min-h-screen relative">
            <div className="mb-8">
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Create Notebook Shortcut */}
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-zinc-700 hover:border-indigo-500 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all group bg-zinc-900/40 hover:bg-zinc-800/30 shadow-sm"
                >
                    <div className="h-12 w-12 rounded-full bg-zinc-800 group-hover:bg-indigo-600 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all text-xl font-light mb-3">
                        +
                    </div>
                    <span className="text-sm font-medium text-zinc-300">
                        Create Notebook
                    </span>
                </div>

                {/* Filtered Notebook List Grid */}
                {filteredNotebooks.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => navigate(`/note/${note.id}`)}
                        className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-64 group hover:border-zinc-700 transition-all cursor-pointer shadow-sm relative"
                    >
                        <button
                            onClick={(e) => handleDeleteClick(e, note.id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/80 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-10"
                            title="Delete Notebook"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>

                        <div className={`flex-1 ${note.coverColor || "bg-indigo-950"} relative flex items-center justify-center p-6 transition-transform group-hover:scale-[1.02]`}>
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/20 border-r border-white/10"></div>

                            {editingId === note.id ? (
                                <RenameNotebook
                                    editTitle={editTitle}
                                    onEditTitleChange={(e) => setEditTitle(e.target.value)}
                                    onSave={(e) => handleRenameSubmit(e, note.id)}
                                    onCancel={(e) => { e.stopPropagation(); setEditingId(null); }}
                                />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className="text-white/90 font-serif text-center font-medium text-lg px-2 line-clamp-2">
                                        {note.title}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingId(note.id);
                                            setEditTitle(note.title);
                                        }}
                                        className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-zinc-400 hover:text-white bg-black/40 px-2 py-0.5 rounded"
                                    >
                                        Rename
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="p-3 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900">
                            <span>Notebook</span>
                            <span>{note.date || "Today"}</span>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <CreateNotebook
                    onCreate={handleCreateNotebook}
                    title={notebookTitle}
                    onTitleChange={(e) => setNotebookTitle(e.target.value)}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {deleteNotebookId !== null && (
                <DeleteNotebook
                    onDelete={confirmDeleteNotebook}
                    onClose={() => setDeleteNotebookId(null)}
                />
            )}
        </div>
    );
}