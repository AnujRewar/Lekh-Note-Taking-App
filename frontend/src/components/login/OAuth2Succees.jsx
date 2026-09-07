import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const name = searchParams.get("name");
        const email = searchParams.get("email");

        const previousUser = localStorage.getItem("last_user");

// If a previous user exists and it's different from the current login email
        if (previousUser && previousUser !== email) {
            localStorage.removeItem("google_drive_token");

           //Clear all stored Drive file IDs because they belong
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith("drive_file_id_")) {
                    localStorage.removeItem(key);
                }
            });
        }

        localStorage.setItem("last_user", email);



        if (token) {
            localStorage.setItem("jwt_token", token);
        }
        if (name) {
            localStorage.setItem("user_name", decodeURIComponent(name));
        }
        if (email) {
            localStorage.setItem("user_email", decodeURIComponent(email));
        }

        // Redirect to dashboard after saving
        navigate("/dashboard", { replace: true });
    }, [searchParams, navigate]);

    return (
        <div className="flex h-screen w-screen bg-black text-white items-center justify-center">
            <p className="text-sm text-zinc-400">Authenticating with Google...</p>
        </div>
    );
}