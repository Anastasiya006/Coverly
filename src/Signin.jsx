import { useTheme } from "next-themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, GoogleAuthProvider } from "./firebase"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function SignIn () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/signup");
        } catch (error) {
            setError(error.message);
        }
    }

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            navigate("/signup");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-left text-[#200445] mb-2">Sign In</h2>
            <p className="text-md font-normal text-left text-gray-400 mb-6">Welcome back, please enter your details.</p>

    
            {/* email login form */}
            <form onSubmit={handleLoginWithEmail} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#200445]">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8270DB] placeholder-gray-400 text-[#200445] text-sm font-normal"
                    />
              </div>
    
              <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#200445]">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8270DB] text-[#200445] text-sm font-normal"
                    />
              </div>
    
              <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#8270DB] shadow-lg shadow-gray-300 text-white rounded-md hover:bg-[#B8ACF6] focus:outline-none focus:ring-2 focus:ring-[#8270DB] text-sm"
              >Sign In</button>
            </form>
    
            {/* Google login button */}
            <div className="mt-6 text-center">
                <button
                    onClick={handleLoginWithGoogle}
                    className="w-full py-2 px-4 bg-white shadow-lg shadow-gray-300 text-[#200445] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8270DB] flex items-center justify-center text-sm"
                >
                {/* Google logo */}
                <img 
                    src="src/assets/google-logo.png" 
                    alt="Google logo" 
                    className="w-5 h-5 mr-2" 
                />
                Sign in with Google
                </button>
            </div>
    
            {/* link to sign up */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-[#8270DB] hover:underline">Sign Up</a></p>
            </div>
          </div>
        </div>
    );
};