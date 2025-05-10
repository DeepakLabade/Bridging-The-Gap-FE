import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ClientSignup() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();

        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/client/signup", {
                username,
                email,
                password
            });
            
            // Handle successful signup
            console.log("Signup successful:", response.data);
            // Redirect or show success message here

            navigate("/client/signin")
            
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
            console.error("Signup error:", err);
            navigate("/")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex bg-gray-100">
            {/* Left: Signup Form Section */}
            <div className="w-2/5 flex flex-col justify-center items-center p-10">
                <div className="bg-gray-100 p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Get Started Now</h1>
                    <p className="text-center text-gray-500 mb-4">Enter your Credentials to Create your account</p><br></br>

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
                            onClick={() => navigate("/client/signin")}
                        >
                            Sign In
                        </span>
                    </p>
                </div>
            </div>

            {/* Right: Image Section */}
            <div className="w-3/5 flex justify-center items-center p-34">
                <img
                    src="/public/clientsignup.jpg" // Update with the actual path to your image
                    alt="Signup Illustration"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    );
}

