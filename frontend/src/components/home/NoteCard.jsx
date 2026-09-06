import React from 'react';
import RenameNotebook from './notebook/RenameNotebook.jsx';


// not used anywhere currently
export default function NotebookCard({
                                         note,
                                         onNavigate,
                                         onDeleteClick,
                                         isEditing,
                                         editTitle,
                                         onEditTitleChange,
                                         onRenameSubmit,
                                         onRenameCancel,
                                         onStartRename
                                     }) {
    return (
        <div
            onClick={() => onNavigate(note.id)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-64 group hover:border-zinc-700 transition-all cursor-pointer shadow-sm relative"
        >
            {/* Delete Hover Button */}
            <button
                onClick={(e) => onDeleteClick(e, note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600/80 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md z-10"
                title="Delete Notebook"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            <div className={`flex-1 ${note.coverColor || "bg-indigo-950"} relative flex items-center justify-center p-6 transition-transform group-hover:scale-[1.02]`}>
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/20 border-r border-white/10"></div>

                {isEditing ? (
                    <RenameNotebook
                        editTitle={editTitle}
                        onEditTitleChange={onEditTitleChange}
                        onSave={(e) => onRenameSubmit(e, note.id)}
                        onCancel={onRenameCancel}
                    />
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-white/90 font-serif text-center font-medium text-lg px-2 line-clamp-2">
                            {note.title}
                        </span>
                        <button
                            onClick={(e) => onStartRename(e, note)}
                            className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-zinc-400 hover:text-white bg-black/40 px-2 py-0.5 rounded"
                        >
                            Rename
                        </button>
                    </div>
                )}
            </div>

            <div className="p-3 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900">
                <span>{note.category || "Notebook"}</span>
                <span>{note.date || "Today"}</span>
            </div>
        </div>
    );
}