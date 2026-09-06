export default function DeleteFolderModal({ folderName, onDelete, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl w-96 shadow-2xl">
                <h2 className="text-lg font-semibold text-white mb-2">Delete Folder</h2>
                <p className="text-sm text-zinc-400 mb-6">
                    Are you sure you want to delete <span className="text-white font-medium">"{folderName}"</span>? Notes inside will become unfiled.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onDelete}
                        className="px-4 py-2 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-500 transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}