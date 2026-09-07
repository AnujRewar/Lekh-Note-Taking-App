import React from 'react';
import img1 from './images/login1.jpg';

function RightSide() {
    return (
        <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">

            {/* LEFT SIDE BLUR - Adjusted to dynamically match the main card sizing */}
            <div className="absolute left-[calc(50%-230px)] md:left-[calc(50%-250px)] w-[300px] md:w-[380px] h-[400px] md:h-[500px] -rotate-2 pointer-events-none select-none">

                <img
                    src={img1}
                    alt=""
                    className="w-full h-full object-cover blur-2xl opacity-40 scale-95"
                />

                {/* Hide blur everywhere except left fade transition */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/80 to-zinc-950" />

            </div>


            {/* MAIN IMAGE CONTAINER */}
            <div className="relative z-10 rotate-2">

                <div className="w-[300px] md:w-[380px] h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl border border-white/10">

                    <img
                        src={img1}
                        alt="Taking notes in tablet"
                        className="w-full h-full object-cover"
                    />

                </div>

                <div className="absolute -bottom-2 -left-16 md:-left-24 bg-white text-black px-4 md:px-5 py-2.5 md:py-3 rounded-2xl shadow-xl">
                    <p className="text-[11px] md:text-xs text-gray-500">
                        Write. Organize. Remember.
                    </p>

                    <p className="text-xs md:text-sm font-semibold mt-0.5 md:mt-1">
                        Your thoughts, your way.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default RightSide;