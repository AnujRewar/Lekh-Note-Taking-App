import {Link, useNavigate} from 'react-router-dom'
import api from '../../api/api.jsx'
import {useState} from "react";

function LeftSide(){
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const[error,setError]=useState('');
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   const handleLogin = async(e)=>{
    e.preventDefault(); //to avoid complete page reload
      try{
         const loginResponse = await api.post(
             "/auth/authenticate",
             {
                email:email,
                password:password
             }
         );

         console.log(loginResponse.data);
         setTimeout(()=>{
            navigate("/dashboard",{
               state:{
                  email:email
               }
            });
         })
      }
      catch(err){
         if(err.response?.status === 401){
            setError("Invalid username or password");
         }
         else{
            setError("Something went wrong");
         }
         console.log(err);
      }
   };
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
                   <Link
                       to="/register"
                       className="font-medium text-indigo-400 hover:text-indigo-300"
                   >
                      Register
                   </Link>
                </p>
             </div>

             <div className="mt-6">
                <form onSubmit={handleLogin} action="#about" method="POST" className="space-y-4">

                   {/* Email Input */}
                   {error && (
                       <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                          {error}
                       </div>
                   )}
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
                             value={email}
                             onChange={(e)=>setEmail(e.target.value)}
                             className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                         />
                      </div>
                   </div>

                   {/* Password Input */}
                   <div>
                      <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-300"
                      >
                         Password
                      </label>

                      <div className="mt-1 relative">
                         <input
                             id="password"
                             name="password"
                             type={showPassword ? "text" : "password"}
                             autoComplete="current-password"
                             required
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                         />

                         <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="mr-2  cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors"
                         >
                            {showPassword ? "Hide" : "Show"}
                         </button>
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
                         <Link to="/insert-email" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Forgot password?
                         </Link>
                      </div>
                   </div>

                   {/* Submit Button */}
                   <div>
                      <button
                          type="submit"
                          className=" cursor-pointer w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                             href="http://localhost:8080/oauth2/authorization/google"
                             className=" ml-28 w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
                         >
                            <span className="sr-only">Sign in with Google</span>
                            {/* Google SVG Icon */}
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                               <path
                                   fill="#4285F4"
                                   d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39z"
                               />

                               <path
                                   fill="#34A853"
                                   d="M12 21.9c2.63 0 4.84-.87 6.45-2.34l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.5A9.75 9.75 0 0 0 12 21.9z"
                               />

                               <path
                                   fill="#FBBC05"
                                   d="M6.53 14.03A5.86 5.86 0 0 1 6.22 12c0-.7.12-1.38.31-2.03v-2.5H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.53l3.24-2.5z"
                               />

                               <path
                                   fill="#EA4335"
                                   d="M12 5.94c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 2.98 14.63 2.1 12 2.1a9.75 9.75 0 0 0-8.71 5.37l3.24 2.5C7.3 7.66 9.46 5.94 12 5.94z"
                               />
                            </svg>
                            Google
                         </a>
                      </div>

                      {/*<div>*/}
                      {/*   <a*/}
                      {/*       href="#"*/}
                      {/*       className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"*/}
                      {/*   >*/}
                      {/*      <span className="sr-only">Sign in with GitHub</span>*/}
                      {/*      /!* GitHub SVG Icon *!/*/}
                      {/*      <svg className="w-5 h-5 mr-2 text-gray-300" fill="currentColor" viewBox="0 0 20 20">*/}
                      {/*         <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.836c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.92.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />*/}
                      {/*      </svg>*/}
                      {/*      GitHub*/}
                      {/*   </a>*/}
                      {/*</div>*/}
                   </div>
                </div>
             </div>
          </div>
       </div>

   )
}

export default LeftSide;