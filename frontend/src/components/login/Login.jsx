import React from 'react'
import Navbar from "./Navbar.jsx";
import LeftSide from "./LeftSide.jsx";
import RightSide from "./RightSide.jsx";
import About from "./about_section/About.jsx";
import Contact from "./Contact.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Login(props){
    return (

        <div className=" bg-black">

            <section id="navbar">
                <Navbar />
            </section>

            <main className="h-[calc(100vh-80px)] flex">

                <section id= "leftSide" className="w-1/2 h-full ">
                    <LeftSide />
                </section>

                <section id ="rightSide" className="w-1/2 h-full p-6">
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

        </div>

    );
}

export default Login;
