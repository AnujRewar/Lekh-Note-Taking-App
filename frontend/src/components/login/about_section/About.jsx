import AboutLeft from "./LeftAbout.jsx";
import AboutRight from "./RightAbout.jsx";

function About() {
    return (
        <section
            id="about"
            className="min-h-screen bg-zinc-950 text-white flex items-center px-4 sm:px-8 md:px-12"
        >
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="w-full min-w-0 overflow-hidden">
                    <AboutLeft />
                </div>

                <div className="w-full min-w-0 overflow-hidden pt-2 lg:pt-6">
                    <AboutRight />
                </div>
            </div>
        </section>
    );
}

export default About;