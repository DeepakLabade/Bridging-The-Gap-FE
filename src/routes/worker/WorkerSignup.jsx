import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkerSignup() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const descriptionRef = useRef(null);
    const occupationRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();

        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const description = descriptionRef.current.value;
        const occupation = occupationRef.current.value;

        if (!username || !email || !password || !description || !occupation) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/worker/signup", {
                username,
                email,
                password,
                description,
                occupation
            });

            console.log("Signup successful:", response.data);
            navigate("/worker/signin");

        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex bg-gray-100">
            {/* Left: Signup Form Section */}
            <div className="w-2/5 flex flex-col justify-center items-center p-10">
                <div className="bg-gray-100 p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Worker Signup</h1>
                    <p className="text-center text-gray-500 mb-4">Create your account</p>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold">Username</label>
                            <input
                                type="text"
                                ref={nameRef}
                                placeholder="Enter username"
                                className="border-2 border-gray-300 bg-white rounded-md p-3 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Email address</label>
                            <input
                                type="email"
                                ref={emailRef}
                                placeholder="example@gmail.com"
                                className="border-2 border-gray-300 bg-white rounded-md p-3 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Password</label>
                            <input
                                type="password"
                                ref={passwordRef}
                                placeholder="Password"
                                className="border-2 border-gray-300 bg-white rounded-md p-3 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Occupation</label>
                            <input
                                type="text"
                                ref={occupationRef}
                                placeholder="Enter your occupation"
                                className="border-2 border-gray-300 bg-white rounded-md p-3 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Description</label>
                            <textarea
                                ref={descriptionRef}
                                placeholder="Tell us about yourself"
                                className="border-2 border-gray-300 bg-white rounded-md p-3 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#52AE77] text-white p-3 rounded-md font-semibold hover:bg-[#52AE80] transition"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-center mt-4 text-gray-600">
                        Have an account? <span
                            className="text-[#52AE77] font-semibold cursor-pointer hover:underline"
                            onClick={() => navigate("/worker/signin")}
                        >
                            Sign In
                        </span>
                    </p>
                </div>
            </div>

            {/* Right: Image Section */}
            <div className="w-3/5 flex justify-center items-center p-10">
                <img
                    src="/public/clientsignup.jpg" // Update with actual image path
                    alt="Worker Signup Illustration"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    );
}
