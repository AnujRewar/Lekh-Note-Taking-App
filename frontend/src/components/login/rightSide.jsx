import React from 'react';
import img1 from './images/login1.jpg';

function rightSide(){
return (
    <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden">

        {/* LEFT SIDE BLUR */}
        <div className="absolute left-[8%] w-[380px] h-[500px] rotate-2">

            <img
                src={img1}
                alt=""
                className="w-full h-full object-cover blur-2xl opacity-50"
            />

            {/* Hide blur everywhere except left */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/70 to-zinc-950" />

        </div>


        {/* MAIN IMAGE */}
        <div className="relative z-10 rotate-2">

            <div className="w-[380px] h-[500px] overflow-hidden rounded-2xl shadow-2xl border border-white/10">

                <img
                    src={img1}
                    alt="Taking notes in tablet"
                    className="w-full h-full object-cover"
                />

            </div>

            <div className="absolute -bottom-0 -left-24 bg-white text-black px-5 py-3 rounded-2xl shadow-xl">
                <p className="text-xs text-gray-500">
                    Write. Organize. Remember.
                </p>

                <p className="text-sm font-semibold mt-1">
                    Your thoughts, your way.
                </p>
            </div>


        </div>

    </div>

);
}
export default rightSide;