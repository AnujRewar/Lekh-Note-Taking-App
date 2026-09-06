export default function RenameNotebook({ editTitle, onEditTitleChange, onSave, onCancel }) {
    return (
        <div onClick={(e) => e.stopPropagation()} className="w-full px-2">
            <input
                type="text"
                value={editTitle}
                onChange={onEditTitleChange}
                autoFocus
                className="w-full bg-black/60 text-white text-center text-sm p-1.5 rounded border border-white/20 outline-none focus:border-indigo-500"
            />
            <div className="flex justify-center gap-2 mt-2">
                <button
                    onClick={onSave}
                    className="bg-indigo-600 text-xs px-3 py-1 rounded text-white hover:bg-indigo-500 transition-all font-medium"
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="bg-zinc-700 text-xs px-3 py-1 rounded text-white hover:bg-zinc-600 transition-all font-medium"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}