import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ClientSignin() {
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
            const response = await axios.post("http://localhost:3000/api/v1/client/signin", {
                email,
                password
            });
            
            // Handle successful signup
            console.log("Signup successful:", response.data);
            // Redirect or show success message here

            navigate('/client/feed')
            
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
            console.error("Signup error:", err);
            navigate("/")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 ">
      
      <div className="w-1/2 p-6 hidden h-full md:flex items-center justify-center  rounded-l-lg">
          <img
            src="/public/signin.jpg"
            alt="Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-100">
           <div className="max-w-md w-full gap-4 items-center">
            <h1 className="text-3xl font-bold text-center text-black ">Welcome back!!</h1>
            <p className="  text-center text-gray-500 mb-10">Please enter your details..</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSignup} className="flex flex-col gap-4 space-y-0 justify-center align-middle ">

            <label class="block text-gray-600 font-medium mb-0 ">Email Address</label>
                <input 
                    type="email" 
                    ref={emailRef} 
                    placeholder="Email" 
                    className="border-2 border-gray-300 rounded-md p-2 bg-[#e5eddb]" 
                    required
                />
                 <label class="block text-gray-600 font-medium mb-0 ">Password</label>
                <input 
                    type="password" 
                    ref={passwordRef} 
                    placeholder="Password" 
                    className="border-2 border-gray-300 rounded-md p-2 bg-[#e5eddb] mb-1" 
                    required
                />
                <button 

                    type="submit" 
                    className="w-3/4 text-center items-center pt-1 ml-15 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 size-10 pb-1 cursor-pointer mb-0"
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Signin"}
                </button>
            </form>
            <div className="mt-3 text-center">
            <p className="text-sm text-gray-600 mt-0">Or</p>
            <button className="w-3/4 ml-15 h-10 flex items-center justify-center border py-3 rounded-lg mt-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
            </div>
            </div> 
        </div>
    );
}