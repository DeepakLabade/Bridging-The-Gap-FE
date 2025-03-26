import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkerSignup() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const descriptionRef = useRef(null)
    const occupationRef = useRef(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault(); // Prevent default form submission
        
        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const description = descriptionRef.current.value;
        const occupation = occupationRef.current.value;

        // Basic validation
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
            
            // Handle successful signup
            console.log("Signup successful:", response.data);
            // Redirect or show success message here
            navigate("/worker/signin")
            
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
            <form onSubmit={handleSignup} className="flex flex-col gap-4 w-84">
                <input 
                    type="text" 
                    ref={nameRef} 
                    placeholder="Name" 
                    className="border-2 border-gray-300 rounded-md p-2" 
                    required
                />
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
                <input 
                    type="text" 
                    ref={occupationRef} 
                    placeholder="occupation" 
                    className="border-2 border-gray-300 rounded-md p-2" 
                    required
                />
                    <textarea 
                    name=""  
                    id="" 
                    type="text"
                    ref={descriptionRef}
                    placeholder="description"
                    className="border-2 border-gray-300 rounded-md p-2" 
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