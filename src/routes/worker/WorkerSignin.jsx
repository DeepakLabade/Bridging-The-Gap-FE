import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkerSignin() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault(); // Prevent default form submission
        
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Basic validation
        if ( !email || !password) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/worker/signin", {
                email,
                password
            });

            axios.defaults.headers.common["Authorization"] = response.data;

            
            // Handle successful signup
            console.log("Signup successful:", response.data);
            // Redirect or show success message here
            navigate("/client/feed")
            
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <input 
                    type="email" 
                    ref={emailRef} 
                    placeholder="Email" 
                    className="border-2 border-gray-300 rounded-md p-2" 
                    required
                />
                <input 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="Password" 
                    className="border-2 border-gray-300 rounded-md p-2" 
                    required
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
}