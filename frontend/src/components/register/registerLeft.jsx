import {Link} from "react-router-dom";
import {useState} from "react";
import api from "../../api/api.jsx";

function RegisterLeft() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState("");

    const handleRegister = async(e) =>{
        e.preventDefault();

        setError("");
        try{

            if(password !== confirmPassword){
                setError("Password do not match")
                return;
            }
            const registerResponse=await api.post(
                "/auth/register",
                {
                    fullName:fullName,
                    username: username,
                    password: password,
                }
            );
            console.log(registerResponse.data);
        }
        catch(err){
            console.log(err);
            setError("Registration failed. Please try again.");
        }
    }
    return (

        <div className=" mt-9 h-auto flex items-center px-10 lg:px-20">

            <div className="w-full max-w-md">

                {/* Brand */}
                <div >

                    <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">
                        Create your account
                    </p>

                    {/*<h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">*/}
                    {/*    Start writing.*/}
                    {/*</h1>*/}

                    {/*<p className="mt-2 text-gray-500">*/}
                    {/*    Create your Lekh account and keep your thoughts*/}
                    {/*    with you wherever you go.*/}
                    {/*</p>*/}

                </div>


                {/* Form */}
                <form onSubmit={handleRegister} className="mt-8 space-y-6">

                    {/* Name */}
                    {error && (
                        <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}
                    <div>

                        <label
                            htmlFor="name"
                            className="block text-sm text-gray-400"
                        >
                            Full name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            required
                            value={fullName}
                            onChange={(e)=>setFullName(e.target.value)}
                            className=" w-full bg-transparent
                                       border-b border-zinc-700
                                       px-0 py-3
                                       text-white
                                       placeholder-zinc-700
                                       outline-none
                                       focus:border-indigo-400
                                       transition-colors duration-300"
                        />

                    </div>


                    {/* Email */}
                    <div>

                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-400"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            className="mt-2 w-full bg-transparent
                                       border-b border-zinc-700
                                       px-0 py-3
                                       text-white
                                       placeholder-zinc-700
                                       outline-none
                                       focus:border-indigo-400
                                       transition-colors duration-300"
                        />

                    </div>


                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-400"
                        >
                            Password
                        </label>

                        <div className="relative mt-2">

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                className="w-full bg-transparent
                       border-b border-zinc-700
                       px-0 py-3 pr-12
                       text-white
                       placeholder-zinc-700
                       outline-none
                       focus:border-indigo-400
                       transition-colors duration-300"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2
                       text-sm text-zinc-500
                       hover:text-indigo-400
                       transition-colors"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>

                        </div>
                    </div>


                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm text-gray-400"
                        >
                            Confirm password
                        </label>

                        <div className="relative mt-2">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Repeat your password"
                            required
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            className="w-full bg-transparent
                                       border-b border-zinc-700
                                       px-0 py-3 pr-12
                                     text-white
                                     placeholder-zinc-700
                                       outline-none
                                     focus:border-indigo-400
                                       transition-colors duration-300"
                        />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-0 top-1/2 -translate-y-1/2
                       text-sm text-zinc-500
                       hover:text-indigo-400
                       transition-colors"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>

                    </div>
                    </div>


                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 py-3
                                   rounded-md
                                   bg-indigo-500
                                   text-sm font-medium text-white
                                   hover:bg-indigo-400
                                   hover:-translate-y-0.5
                                   transition-all duration-300"
                    >
                        Create account
                    </button>

                </form>


                {/* Login */}
                <p className="mt-8 text-sm text-gray-500">

                    Already have an account?{" "}

                    <Link
                        to="/"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        Sign in
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default RegisterLeft;