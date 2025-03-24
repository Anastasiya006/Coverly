"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, SetMounted] = useState(false);

    useEffect(() => {
        console.log("Component mounted");
        SetMounted(true);
    }, []);

    if (!mounted) {
        return null;  
    }

    return (
        <nav className={`flex justify-between items-center ${theme === 'dark' ? 'bg-white' : 'bg-[#200445]'} fixed top-0 left-0 px-15 py-5 w-full`}>
            { /* logo */ }
            <Link to="/" className={`${theme === 'dark' ? 'text-[#200445]' : 'text-white'} text-2xl font-bold`}>Coverly</Link>

            { /* buttons */ }
            <div className="flex items-center space-x-8">
                { mounted && (
                    // only render the theme toggle button after the component has mounted
                    <button onClick={() => {
                        console.log("Current Theme:", theme); // Log the current theme
                        setTheme(theme === "dark" ? "light" : "dark");
                    }}>
                        {theme === "dark" ? (
                            // show sun icon when theme is darkmode
                            <Sun className="w-5 h-5 text-gray-700" />
                        ) : (
                            // show moon icon when theme is lightmode
                             <Moon className="w-5 h-5 text-gray-300" />
                        )}
                    </button>
                )}
                <Link to="/editor" className={`${theme === 'dark' ? 'text-[#2B273F]' : 'text-white'}`}>Sign in</Link>
                <Link to="/signup" className={`bg-[#8270DB] ${theme === 'dark' ? 'text-white' : 'text-[#2B273F]'} px-4 py-2 rounded-md hover:bg-[#B8ACF6]`}>Sign up</Link>
            </div>
        </nav>
    );
}