import { useTheme } from "next-themes";

export default function TitlePage() {
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
            <button className="bg-[#8270DB] text-white px-6 py-3 rounded-full hover:bg-[#B8ACF6]">
                Get Started →
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-15">
                <div className="bg-transparent p-4 text-center">
                    <p className="text-3xl font-bold text-[#B8ACF6]">XX</p>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>Cover Letters Created</p>
                </div>
                <div className="bg-transparent p-4 text-center">
                    <p className="text-3xl font-bold text-[#B8ACF6]">XXs</p>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>Generation Time</p>
                </div>
                <div className="bg-transparent p-4 text-center">
                    <p className="text-3xl font-bold text-[#B8ACF6]">X.X/5</p>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>User Rating</p>
                </div>
            </div>
        </section>
    );
};