import React from 'react'
import Contact from './contact.jsx';
import About from './about_section/about.jsx';
function Navbar(){
    return (
        <nav className="h-20 bg-black text-white flex items-center justify-between px-8 lg:px-12">

            {/* Logo */}
            <a href="#login">
                <div>
                    <h1 className="text-2xl font-serif italic font-bold">
                        Lekh
                    </h1>

                    <p className="text-[9px] tracking-[0.25em] uppercase text-gray-500">
                        Note Taking App
                    </p>
                </div>
            </a>


            {/* Links */}
            <div className="flex gap-8 text-sm text-gray-400">

                {/*<a href="#login" className="hover:text-white transition">*/}
                {/*    Login*/}
                {/*</a>*/}

                <a href="#navbar" className="hover:text-white transition">
                    Home
                </a>

                <a href="#about" className="hover:text-white transition">
                    About
                </a>

                <a href="#contact" className="hover:text-white transition">
                    Contact
                </a>

            </div>

        </nav>
    );

}

export default Navbar;