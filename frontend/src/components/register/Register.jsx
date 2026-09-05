import React from "react";
import RegisterLeft from "./RegisterLeft.jsx";
import RegisterRight from "./RegisterRight.jsx";

function Register() {
    console.log("Register updated");
    return (

        <main className=" h-auto w-full bg-zinc-950 text-white flex">

            {/* LEFT — REGISTER */}
            <section className="w-1/2 min-w-0">
                <RegisterLeft />
            </section>

            {/* RIGHT — BRAND */}
            <section className="w-1/2 min-w-0">
                <RegisterRight />
            </section>

        </main>

    );
}

export default Register;