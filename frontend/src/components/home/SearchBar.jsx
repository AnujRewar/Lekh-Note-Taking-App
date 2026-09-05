

export default function SearchBar() {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search notebooks..."
                className="bg-zinc-800/80 border border-zinc-700 rounded-lg px-4 py-1.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 w-64"
            />
        </div>
    )
}