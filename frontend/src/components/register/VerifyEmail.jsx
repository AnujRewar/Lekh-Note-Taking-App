import api from "../../api/api.jsx"
import {Link,useNavigate,useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
function VerifyEmail(){

    const [otp, setOTP] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if(!email){
            navigate("/register");
        }
    },[email,navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        try{
            const response= await api.post("/auth/verifyOtp",{
                email:email,
                otp:otp,
            });
            setMessage("OTP Verified! Redirecting to Login Page ...");
            setTimeout(() =>{
                navigate("/dashboard",{ state:{email:email}});
            },1500);
        }
        catch(error){
            if (error.response?.status === 401 || error.response?.status === 400) {
                setError("Invalid or expired OTP. Please try again.");
            } else {
                setError("Something went wrong while verifying the OTP.");
            }
            console.log(error);
        }
    }
    if (!email) return null;

    return (
        <div className="h-full w-full flex flex-col justify-center bg-black px-6 py-10 sm:px-8 lg:px-12 xl:px-16 min-h-screen">
            <div className="mx-13 w-full max-w-110 sm:mx-auto sm:max-w-md">

                {/* Header */}
                <div>
                    <h2 className="mt-1 text-2xl font-extrabold text-white">
                        Enter OTP
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        We sent a code to <span className="text-indigo-400 font-medium">{email}</span>.
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

                        {/* OTP Input */}
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                                Security Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    required
                                    placeholder="Enter 6-digit code"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-700 bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm tracking-widest text-center text-lg"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className=" cursor-pointer w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </form>

                    {/* Navigation Links */}
                    <div className="mt-6 flex items-center justify-between text-sm">
                        <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300">
                            Change details
                        </Link>
                        <Link to="/" className="font-medium text-gray-400 hover:text-gray-300">
                            Back to login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default VerifyEmail;