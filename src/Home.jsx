import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

export default function Home() {
    const { theme } = useTheme();

    return (
        <section className={`flex flex-col items-center justify-center py-50 ${theme === 'dark' ? 'bg-white' : 'bg-[#200445]'} text-center`}>
            <h1 className={`text-6xl font-bold ${theme === 'dark' ? 'text-[#2B273F]' : 'text-white'} mb-4`}>
                Craft the perfect
            </h1>
            <h1 className={`text-6xl font-bold ${theme === 'dark' ? 'text-[#2B273F]' : 'text-white'} mb-4`}>
                <span className="text-[#B8ACF6]">cover letter</span> in minutes
            </h1>
            <p className={`px-30 py-5 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'} mb-6`}>
            Coverly helps you craft personalized, professional cover letters that grab employers’ attention and help you land your next job.
            </p>
            <Link to="/signup" className="bg-[#8270DB] text-white px-6 py-3 rounded-full hover:bg-[#B8ACF6] mt-5 mb-2">
                Get Started →
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-15 mb-30">
                <div className="bg-transparent p-4 text-center">
                    <p className="text-3xl font-bold text-[#B8ACF6]">XX</p>
                    <p className={`text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>Cover Letters Created</p>
                </div>
                <div className="bg-transparent p-4 text-center">
                    <p className="text-3xl font-bold text-[#B8ACF6]">XXs</p>
                    <p className={`text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>Generation Time</p>
                </div>
                <div className="bg-transparent p-4 text-center">
                    <p className="text-3xl font-bold text-[#B8ACF6]">X.X/5</p>
                    <p className={`text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>User Rating</p>
                </div>
            </div>

            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-[#2B273F]' : 'text-white'} mb-4`}>
                Build your cover letter in three simple steps
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-15 mb-20">
                <div className="flex flex-col items-center bg-transparent p-4 text-center relative">
                    <div className="timeline-point bg-[#B8ACF6] w-15 h-15 rounded-full border-2 border-[#B8ACF6] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
                    <p className="text-white font-semibold text-2xl">1</p> 
                    </div>
                    <p className="text-2xl font-bold text-[#200445] mt-15 mb-2">Upload information</p>
                    <p className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'} max-w-70`}>Upload your resume and copy-paste the job posting's description.</p>
                </div>
                <div className="flex flex-col items-center bg-transparent p-4 text-center relative">
                    <div className="timeline-point bg-[#B8ACF6] w-15 h-15 rounded-full border-2 border-[#B8ACF6] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
                    <p className="text-white font-semibold text-2xl">2</p> 
                    </div>
                    <p className="text-2xl font-bold text-[#200445] mt-15 mb-2">Customize</p>
                    <p className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'} max-w-70`}>Customize your cover letter with the assistance of integrated AI.</p>
                </div>
                <div className="flex flex-col items-center bg-transparent p-4 text-center relative">
                    <div className="timeline-point bg-[#B8ACF6] w-15 h-15 rounded-full border-2 border-[#B8ACF6] flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2">
                    <p className="text-white font-semibold text-2xl">3</p> 
                    </div>
                    <p className="text-2xl font-bold text-[#200445] mt-15 mb-2">Preview & Export</p>
                    <p className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'} max-w-70`}>Preview and export your cover letter as a professional LaTeX document.</p>
                </div>
            </div>
        </section>
    );
};