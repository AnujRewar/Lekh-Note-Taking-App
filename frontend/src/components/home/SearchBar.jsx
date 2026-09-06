export default function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 w-full col-span-full">
            <h1 className="text-2xl font-bold text-white tracking-wide">My Notebooks</h1>
            <input
                type="text"
                placeholder="Search notebooks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm w-full sm:w-72 focus:outline-none focus:border-indigo-500 transition-all placeholder-zinc-500"
            />
        </div>
    );
}