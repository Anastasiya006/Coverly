import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, GoogleAuthProvider } from "./firebase"; 
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function SignUp () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleSignUpWithEmail = async (e) => {
        e.preventDefault();

        // check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/signin"); // navigate to login after successful sign up
        } catch (error) {
            setError(error.message);
        }
    }

    const handleSignUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            navigate("/signin"); // navigate to login after successful Google sign up
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-left text-[#200445] mb-2">Sign Up</h2>
            <p className="text-md font-normal text-left text-gray-400 mb-6">Welcome, create your account below.</p>

            {/* email sign-up form */}
            <form onSubmit={handleSignUpWithEmail} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#200445]">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8270DB] placeholder-gray-400 text-[#200445] text-sm font-normal"
                    />
                </div>

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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#200445]">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8270DB] text-[#200445] text-sm font-normal"
                    />
                </div>

                {/* Display error message if any */}
                {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
    
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#8270DB] shadow-lg shadow-gray-300 text-white rounded-md hover:bg-[#B8ACF6] focus:outline-none focus:ring-2 focus:ring-[#8270DB] text-sm"
                >
                    Sign Up
                </button>
            </form>
    
            {/* Google sign-up button */}
            <div className="mt-6 text-center">
                <button
                    onClick={handleSignUpWithGoogle}
                    className="w-full py-2 px-4 bg-white shadow-lg shadow-gray-300 text-[#200445] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8270DB] flex items-center justify-center text-sm"
                >
                    {/* Google logo */}
                    <img 
                        src="src/assets/google-logo.png" 
                        alt="Google logo" 
                        className="w-5 h-5 mr-2" 
                    />
                    Sign up with Google
                </button>
            </div>
    
            {/* link to login */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">Already have an account? <a href="/signin" className="text-[#8270DB] hover:underline">Sign In</a></p>
            </div>
          </div>
        </div>
    );
};
