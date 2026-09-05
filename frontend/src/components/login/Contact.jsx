import React from 'react';

function Contact() {
    return (
        <section className="h-screen bg-zinc-950 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-zinc-800">
            <div className="w-full max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-indigo-400"></div>
                        <span className="text-xs uppercase tracking-[0.4em] text-indigo-400 font-medium">
                            Get In Touch
                        </span>
                        <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-indigo-400"></div>
                    </div>

                    <h2 className=" mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                        <span  className="block">Let's build</span>
                        <span className="block mt-2">
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                something amazing
                            </span>
                            <span className="block sm:inline"> together.</span>
                        </span>
                    </h2>

                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-400 to-transparent mx-auto mt-6"></div>

                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-base sm:text-lg leading-relaxed">
                        Have a question, idea, or just want to say hello?
                        We'd love to hear from you. Reach out and let's create
                        something extraordinary.
                    </p>
                </div>

                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

                    {/* Email Card */}
                    <div className="group bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 hover:border-indigo-400/40 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-indigo-500/5 text-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
                        <a href="mailto:anujrewar5@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 text-lg font-medium">
                            anujrewar5@gmail.com
                        </a>
                        <p className="text-xs text-zinc-500 mt-2">We'll respond within 24 hours</p>
                    </div>

                    {/* Location Card */}
                    <div className="group bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 hover:border-indigo-400/40 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-indigo-500/5 text-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">Location</h3>
                        <p className="text-gray-300 text-lg font-medium">IIIT Manipur, Imphal</p>
                        <p className="text-xs text-zinc-500 mt-2">Available for remote meetings</p>
                    </div>

                    {/* Hours Card */}
                    <div className="group bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800 hover:border-indigo-400/40 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-indigo-500/5 text-center">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold text-white mb-1">Working Hours</h3>
                        <p className="text-gray-300 text-lg font-medium">Sat - Sun, 9AM - 6PM</p>
                        <p className="text-xs text-zinc-500 mt-2">IST timezone</p>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-3 text-center">
                    <p className="text-sm text-zinc-500 mb-4">Connect with us</p>
                    <div className="flex gap-4 justify-center">
                        <a href="#" className="w-12 h-12 rounded-xl bg-zinc-800/50 hover:bg-indigo-500/20 border border-zinc-700 hover:border-indigo-400 flex items-center justify-center transition-all duration-300 group hover:translate-y-[-2px]">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="https://github.com/AnujRewar" className="w-12 h-12 rounded-xl bg-zinc-800/50 hover:bg-indigo-500/20 border border-zinc-700 hover:border-indigo-400 flex items-center justify-center transition-all duration-300 group hover:translate-y-[-2px]">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/anuj-rewar-450527326/" className="w-12 h-12 rounded-xl bg-zinc-800/50 hover:bg-indigo-500/20 border border-zinc-700 hover:border-indigo-400 flex items-center justify-center transition-all duration-300 group hover:translate-y-[-2px]">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        {/* YouTube */}
                        <a href="#" className="w-12 h-12 rounded-xl bg-zinc-800/50 hover:bg-indigo-500/20 border border-zinc-700 hover:border-indigo-400 flex items-center justify-center transition-all duration-300 group hover:translate-y-[-2px]">
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Bottom decorative element */}
                <div className=" mt-12 flex justify-center gap-4">
                    <div className="w-16 h-1 rounded-full bg-gradient-to-r from-indigo-400/20 to-transparent"></div>
                    <div className="w-8 h-1 rounded-full bg-indigo-400/20"></div>
                    <div className="w-16 h-1 rounded-full bg-gradient-to-l from-indigo-400/20 to-transparent"></div>
                </div>
            </div>
        </section>
    );
}

export default Contact;