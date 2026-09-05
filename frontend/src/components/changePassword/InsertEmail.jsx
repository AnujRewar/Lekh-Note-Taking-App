import api from "../../api/api.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function InsertEmail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        var flag=false;
        try{

                setMessage("Verifying email ...");

            const response= await api.post("/auth/verifyEmail",{
                email:email,
            });
            setMessage("Email verified! OTP sent successfully.");
            setTimeout(() => {
                navigate("/insert-otp", { state: { email: email } });
            }, 1500);
        }
        catch(err){
            setMessage("");
            if(err.response?.status === 404 || err.response?.status === 400) {
                setError("No account found with this email.");
            } else {
                setError("Something went wrong while verifying the email.");
            }
            console.log(err);
        }
        }

    return (
        <div className="h-full w-full flex flex-col justify-center bg-black px-6 py-10 sm:px-8 lg:px-12 xl:px-16 min-h-screen">
            <div className="mx-13 w-full max-w-110 sm:mx-auto sm:max-w-md">

                {/* Header */}
                <div>
                    <h2 className="mt-1 text-2xl font-extrabold text-white">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter your registered email and we'll send you an OTP to reset your password.
                    </p>
                </div>

                <div className="mt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {/* Success Message */}
                        {message && (
                            <div className="mb-4 rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                {message}
                            </div>
                        )}

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
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className=" cursor-pointer w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Send OTP
                            </button>
                        </div>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
                            Back to login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default InsertEmail;