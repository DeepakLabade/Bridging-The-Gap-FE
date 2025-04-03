import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function WorkerSignup() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const descriptionRef = useRef(null)
    const addressRef = useRef(null);
    const occupationRef = useRef(null)
    const skillRef = useRef(null)
    const experienceRef = useRef()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    async function handleSignup(e) {
        e.preventDefault(); // Prevent default form submission
        
        const username = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const description = descriptionRef.current.value;
        const address = addressRef.current.value;
        const occupation = occupationRef.current.value;
        const skill = skillRef.current.value;
        const experience = experienceRef.current.value;

        // Basic validation
        if (!username || !email || !password || !description || !occupation || !experience) {
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
                occupation,
                skill,
                experience,
                address
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

    // return (
    //     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    //         <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
    //         {error && <p className="text-red-500 mb-4">{error}</p>}
    //         <form onSubmit={handleSignup} className="flex flex-col gap-4 w-84">
    //             <input 
    //                 type="text" 
    //                 ref={nameRef} 
    //                 placeholder="Name" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //             <input 
    //                 type="email" 
    //                 ref={emailRef} 
    //                 placeholder="Email" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //             <input 
    //                 type="password" 
    //                 ref={passwordRef} 
    //                 placeholder="Password" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //             <input 
    //                 type="text" 
    //                 ref={occupationRef} 
    //                 placeholder="occupation" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //             <input 
    //                 type="text" 
    //                 ref={addressRef} 
    //                 placeholder="address" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //             <input 
    //                 type="number" 
    //                 ref={experienceRef} 
    //                 placeholder="experience" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //             <input 
    //                 type="text" 
    //                 ref={skillRef} 
    //                 placeholder="skills" 
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //                 required
    //             />
    //                 <textarea 
    //                 name=""  
    //                 id="" 
    //                 type="text"
    //                 ref={descriptionRef}
    //                 placeholder="description"
    //                 className="border-2 border-gray-300 rounded-md p-2" 
    //             />
    //             <button 
    //                 type="submit" 
    //                 className="bg-blue-500 text-white p-2 rounded-md disabled:opacity-50"
    //                 disabled={loading}
    //             >
    //                 {loading ? "Signing up..." : "Signup"}
    //             </button>
    //         </form>
    //     </div>
    // );


    return (
        <div className="h-full flex bg-gray-100">
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
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Email address</label>
                            <input
                                type="email"
                                ref={emailRef}
                                placeholder="example@gmail.com"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Password</label>
                            <input
                                type="password"
                                ref={passwordRef}
                                placeholder="Password"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">occupation</label>
                            <input
                                type="text"
                                ref={occupationRef}
                                placeholder="occupation"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Skill</label>
                            <input
                                type="text"
                                ref={skillRef}
                                placeholder="Enter your skill"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">experinece</label>
                            <input
                                type="number"
                                ref={experienceRef}
                                placeholder="Enter your experience"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Address</label>
                            <input
                                type="text"
                                ref={addressRef}
                                placeholder="Enter your Address"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Description</label>
                            <textarea
                                ref={descriptionRef}
                                placeholder="Tell us about yourself"
                                className="border-2 border-gray-300 bg-white rounded-md p-1 w-full focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#52AE77] text-white p-1 rounded-md font-semibold hover:bg-[#52AE80] transition"
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
            <div className="w-1/5 flex justify-center items-center p-10">
                {/* <img
                    src="/public/signupimg.jpg" // Update with actual image path
                    alt="Worker Signup Illustration"
                    className=""
                /> */}
            </div>
        </div>
    );

}