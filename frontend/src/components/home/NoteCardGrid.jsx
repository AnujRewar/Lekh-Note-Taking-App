import { useNavigate } from "react-router-dom";
import {useState} from "react";

export default function NoteCardGrid({ notebooks }) {
    const navigate = useNavigate();
    const [notebook, setNotebooks] = useState([
        { id: 1, title: "Computer Architecture", date: "2026-08-31", coverColor: "bg-indigo-900" },
        { id: 2, title: "Data Science", date: "2026-08-27", coverColor: "bg-blue-900" },
    ]);


    return (
        <div className="p-8 flex-1 overflow-y-auto bg-zinc-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {/* Create Notebook Shortcut */}
                <div
                    onClick={() => navigate("/note/new")}
                    className="border-2 border-dashed border-zinc-700 hover:border-indigo-500 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all group bg-zinc-900/40 hover:bg-zinc-800/30 shadow-sm"
                >
                    <div className="h-12 w-12 rounded-full bg-zinc-800 group-hover:bg-indigo-600 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all text-xl font-light mb-3">
                        +
                    </div>
                    <span className="text-sm font-medium text-zinc-300">Create Notebook</span>
                </div>

                {/* Notebook List Grid */}
                {notebook.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => navigate(`/note/${note.id}`)}
                        className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-64 group hover:border-zinc-700 transition-all cursor-pointer shadow-sm"
                    >
                        <div className={`flex-1 ${note.coverColor || "bg-indigo-950"} relative flex items-center justify-center p-6 transition-transform group-hover:scale-[1.02]`}>
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/20 border-r border-white/10"></div>
                            <span className="text-white/90 font-serif text-center font-medium text-lg px-2 line-clamp-2">
                                {note.title}
                            </span>
                        </div>
                        <div className="p-3 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900">
                            <span>Notebook</span>
                            <span>{note.date || "Today"}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}