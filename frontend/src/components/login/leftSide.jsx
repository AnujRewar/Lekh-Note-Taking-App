
function leftSide(){
   return (

       <div className="h-full w-full flex flex-col justify-center bg-black px-6 py-10 sm:px-8 lg:px-12 xl:px-16">

          <div className="mx-13 w-full max-w-110">

             {/* Logo & Header */}
             <div>
                <svg className="h-0 w-auto text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                </svg>
                <h2 className="mt-1 text-2xl font-extrabold text-white">
                   Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-400">
                   Not a member?{' '}
                   <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                      Join
                   </a>
                </p>
             </div>

             <div className="mt-6">
                <form action="#" method="POST" className="space-y-4">

                   {/* Email Input */}
                   <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                         Email address
                      </label>
                      <div className="mt-1">
                         <input
                             id="email"
                             name="email"
                             type="email"
                             autoComplete="email"
                             required
                             className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                         />
                      </div>
                   </div>

                   {/* Password Input */}
                   <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                         Password
                      </label>
                      <div className="mt-1">
                         <input
                             id="password"
                             name="password"
                             type="password"
                             autoComplete="current-password"
                             required
                             className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         />
                      </div>
                   </div>

                   {/* Remember Me & Forgot Password */}
                   <div className="flex items-center justify-between">
                      <div className="flex items-center">
                         <input
                             id="remember-me"
                             name="remember-me"
                             type="checkbox"
                             className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
                         />
                         <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                            Remember me
                         </label>
                      </div>

                      <div className="text-sm">
                         <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Forgot password?
                         </a>
                      </div>
                   </div>

                   {/* Submit Button */}
                   <div>
                      <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                         Sign in
                      </button>
                   </div>
                </form>

                <div className="mt-6">

                   {/* Divider */}
                   <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                         <div className="w-full border-t border-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">
                    Or continue with
                  </span>
                      </div>
                   </div>

                   {/* Social Login Buttons */}
                   <div className="mt-6 grid grid-cols-2 gap-3">
                      <div>
                         <a
                             href="#"
                             className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
                         >
                            <span className="sr-only">Sign in with Google</span>
                            {/* Google SVG Icon */}
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                               <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            Google
                         </a>
                      </div>

                      <div>
                         <a
                             href="#"
                             className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
                         >
                            <span className="sr-only">Sign in with GitHub</span>
                            {/* GitHub SVG Icon */}
                            <svg className="w-5 h-5 mr-2 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                            GitHub
                         </a>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

   )
}

export default leftSide;