function RegisterRight() {
    return (
        <div className="min-h-screen relative overflow-hidden
                        flex items-center justify-center
                        border-l border-zinc-900">

            {/* Background circles */}
            <div
                className="absolute w-[500px] h-[500px]
                           border border-zinc-800
                           rounded-full opacity-40
                           animate-[spin_30s_linear_infinite]"
            />

            <div
                className="absolute w-[350px] h-[350px]
                           border border-zinc-800
                           rounded-full opacity-50"
            />

            {/* Content */}
            <div className="relative z-10 px-10 max-w-xl">

                <p className="text-sm uppercase tracking-[0.3em] text-zinc-600">
                    Welcome to Lekh
                </p>

                <h2 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
                    Give your
                    <br />
                    <span className="text-zinc-600">
                        thoughts
                    </span>
                    <br />
                    somewhere to stay.
                </h2>

                <p className="mt-8 text-gray-500 text-lg leading-relaxed max-w-md">
                    Write down ideas, save what matters,
                    and access your notes whenever inspiration
                    finds you.
                </p>

                {/* Small accent */}
                <div className="mt-12 flex items-center gap-4">

                    <div className="w-16 h-1 rounded-full
                                    bg-gradient-to-r
                                    from-indigo-400
                                    to-transparent">
                    </div>

                    <span className="text-xs uppercase tracking-[0.25em] text-zinc-700">
                        Lekh
                    </span>

                </div>

            </div>

        </div>
    );
}

export default RegisterRight;