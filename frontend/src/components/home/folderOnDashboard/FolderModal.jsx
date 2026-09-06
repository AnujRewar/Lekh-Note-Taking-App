export default function FolderModal({ folderName, onFolderNameChange, onCreate, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl w-96 shadow-2xl">
                <h2 className="text-lg font-semibold text-white mb-4">Create New Folder</h2>
                <form onSubmit={onCreate}>
                    <input
                        type="text"
                        placeholder="Folder Name..."
                        value={folderName}
                        onChange={onFolderNameChange}
                        autoFocus
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 text-sm mb-5"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}