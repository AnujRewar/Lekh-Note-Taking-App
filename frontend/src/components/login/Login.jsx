import React from 'react'
import Navbar from "./Navbar.jsx";
import LeftSide from "./LeftSide.jsx";
import RightSide from "./RightSide.jsx";
import About from "./about_section/About.jsx";
import Contact from "./Contact.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Login(props){
    return (

        <div className=" bg-black min-h-screen flex flex-col">

            <section id="navbar" className="shrink-0">
                <Navbar />
            </section>

            <main className="flex flex-col lg:flex-row lg:h-[calc(100vh-80px)] w-full">

                <section id= "leftSide" className="w-full lg:w-1/2 flex items-center justify-center ">
                    <LeftSide />
                </section>

                <section id ="rightSide" className="w-full lg:w-1/2 p-6 flex items-center justify-center">
                    <RightSide />
                </section>

            </main>

            <section id= "home" className=" h-full ">

            </section>

            <section id= "about" className="h-full ">
             <About />
            </section>

            <section id="contact" className="h-full ">
            <Contact />
            </section>


            <footer className="ppy-8 px-6 text-center text-xs text-zinc-500 border-t border-zinc-900 flex justify-center gap-6 mt-auto">
                <Link to="/privacy_policy" className="hover:underline text-zinc-400">Privacy Policy</Link>
                <Link to="/terms_of_use" className="hover:underline text-zinc-400">Terms of Service</Link>
            </footer>



        </div>

    );
}

export default Login;
