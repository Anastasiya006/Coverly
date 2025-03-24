import { useTheme } from "next-themes";

export default function Dashboard () {
    const { theme } = useTheme();

    return (
        <section className={`flex flex-col items-start justify-center py-30 ${theme === 'dark' ? 'bg-white' : 'bg-[#200445]'} text-left`}>
            <h1 className={`text-5xl font-bold ${theme === 'dark' ? 'text-[#2B273F]' : 'text-white'} mb-4 px-15`}>
                Welcome [user name]
            </h1>
        </section>
    );
};