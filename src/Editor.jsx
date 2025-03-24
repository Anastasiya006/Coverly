import { useState } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import { pdfMakeVfs } from "pdfmake/build/vfs_fonts";
import { UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

pdfMake.vfs = pdfMakeVfs;

export default function LatexPreview() {
    const [coverLetter, setCoverLetter] = useState("Paste your job description here...");
    const [pdfUrl, setPdfUrl] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [company, setCompany] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [progress, setProgress] = useState(24);
    const [selectedForm, setSelectedForm] = useState("Contact");

    const sidebarItems = [
        { name: "Contact", icon: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" },
        { name: "Education", icon: "M7.702 1.368a.75.75 0 0 1 .597 0c2.098.91 4.105 1.99 6.004 3.223a.75.75 0 0 1-.194 1.348A34.27 34.27 0 0 0 8.341 8.25a.75.75 0 0 1-.682 0c-.625-.32-1.262-.62-1.909-.901v-.542a36.878 36.878 0 0 1 2.568-1.33.75.75 0 0 0-.636-1.357 38.39 38.39 0 0 0-3.06 1.605.75.75 0 0 0-.372.648v.365c-.773-.294-1.56-.56-2.359-.8a.75.75 0 0 1-.194-1.347 40.901 40.901 0 0 1 6.005-3.223ZM4.25 8.348c-.53-.212-1.067-.411-1.611-.596a40.973 40.973 0 0 0-.418 2.97.75.75 0 0 0 .474.776c.175.068.35.138.524.21a5.544 5.544 0 0 1-.58.681.75.75 0 1 0 1.06 1.06c.35-.349.655-.726.915-1.124a29.282 29.282 0 0 0-1.395-.617A5.483 5.483 0 0 0 4.25 8.5v-.152Z M7.603 13.96c-.96-.6-1.958-1.147-2.989-1.635a6.981 6.981 0 0 0 1.12-3.341c.419.192.834.393 1.244.602a2.25 2.25 0 0 0 2.045 0 32.787 32.787 0 0 1 4.338-1.834c.175.978.315 1.969.419 2.97a.75.75 0 0 1-.474.776 29.385 29.385 0 0 0-4.909 2.461.75.75 0 0 1-.794 0Z"},
        { name: "Experience", icon: "M11 4V3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1ZM9 2.5H7a.5.5 0 0 0-.5.5v1h3V3a.5.5 0 0 0-.5-.5ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z M3 11.83V12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-.17c-.313.11-.65.17-1 .17H4c-.35 0-.687-.06-1-.17Z"},
        { name: "Skills", icon: "M9.58 1.077a.75.75 0 0 1 .405.82L9.165 6h4.085a.75.75 0 0 1 .567 1.241l-6.5 7.5a.75.75 0 0 1-1.302-.638L6.835 10H2.75a.75.75 0 0 1-.567-1.241l6.5-7.5a.75.75 0 0 1 .897-.182Z" },
        { name: "Recipient", icon: "M3 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H3Zm2.5 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM10 5.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm.75 3.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5h-1.5ZM10 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 10 8Zm-2.378 3c.346 0 .583-.343.395-.633A2.998 2.998 0 0 0 5.5 9a2.998 2.998 0 0 0-2.517 1.367c-.188.29.05.633.395.633h4.244Z" },
        { name: "Job Details", icon: "M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75V4h3Z M3 6a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3Zm1.75 2.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM4 11.75a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Z" },
        { name: "Generate", icon: "M7.25 1.75a.75.75 0 0 1 1.5 0v1.5a.75.75 0 0 1-1.5 0v-1.5ZM11.536 2.904a.75.75 0 1 1 1.06 1.06l-1.06 1.061a.75.75 0 0 1-1.061-1.06l1.06-1.061ZM14.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM4.464 9.975a.75.75 0 0 1 1.061 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061ZM4.5 7.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75ZM5.525 3.964a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 1.06-1.061l1.061 1.06ZM8.779 7.438a.75.75 0 0 0-1.368.366l-.396 5.283a.75.75 0 0 0 1.212.646l.602-.474.288 1.074a.75.75 0 1 0 1.449-.388l-.288-1.075.759.11a.75.75 0 0 0 .726-1.165L8.78 7.438Z" },
        { name: "AI Support", icon: "M1 8.74c0 .983.713 1.825 1.69 1.943.764.092 1.534.164 2.31.216v2.351a.75.75 0 0 0 1.28.53l2.51-2.51c.182-.181.427-.286.684-.294a44.298 44.298 0 0 0 3.837-.293C14.287 10.565 15 9.723 15 8.74V4.26c0-.983-.713-1.825-1.69-1.943a44.447 44.447 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482ZM5.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2.5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3.5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" },
    ];

    // generate PDF
    const generatePDF = () => {
        const docDefinition = {
            content: [
                { text: "Cover Letter", style: "header" },
                { text: coverLetter, style: "body" }
            ],
            styles: {
                header: { fontSize: 18, bold: true, marginBottom: 10 },
                body: { fontSize: 12 }
            }
        };

        pdfMake.createPdf(docDefinition).getBuffer((buffer) => {
            const blob = new Blob([buffer], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url); // update state with the URL for iframe
        });
    };

    return (
        <div className="flex h-screen gap-10 px-15 py-30 bg-gray-100">
            {/* vertical sidebar */}
            <div className="w-50 flex flex-col justify-betweenw-1/4 bg-gray-800 text-white p-4 bg-white rounded-md">
                <ul>
                    {sidebarItems.map((item) => (
                        <li
                            key={item.name}
                            className={`px-2 py-2 mb-4 flex items-center space-x-4 bg-gray-100 border border-gray-300 rounded-lg shadow-lg text-gray-400 cursor-pointer ${
                                selectedForm === item.name ? "bg-gray-300" : ""
                            }`}
                            onClick={() => setSelectedForm(item.name)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 text-gray-400"
                            >
                                <path d={item.icon} />
                            </svg>
                            <span className="text-xs font-normal">{item.name}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-auto">
                    <div className="flex items-center gap-2">
                        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#8270DB] transition-all"
                                style={{ width: `${progress}%` }} // Dynamic width
                            ></div>
                        </div>
                        <span className="text-xs font-normal text-gray-400">{progress}%</span>
                    </div>
                </div>
            </div>
            {/* left side - input */}
            <div className="w-4/10 p-4">
                {selectedForm === "Contact" && <ContactForm />}
                {selectedForm === "Education" && <EducationForm />}
                {selectedForm === "Experience" && <ExperienceForm />}
                {selectedForm === "Skills" && <SkillsForm />}
                {selectedForm === "Recipient" && <RecipientForm />}
                {selectedForm === "Job Details" && <JobDetailsForm />}
                {selectedForm === "Generate" && <GenerateForm />}
                {selectedForm === "AI Support" && <AISupportForm />}
            </div>

            {/* right side - LaTeX-style PDF Preview */}
            <div className="w-6/10 h-full">
                <h2 className="text-xl font-bold mb-2">PDF Preview</h2>
                {pdfUrl ? (
                    <iframe
                        title="pdf-preview"
                        src={pdfUrl}
                        className="w-full h-full border"
                    />
                ) : (
                    <p>Click on 'Generate PDF' to preview the PDF.</p>
                )}
            </div>
        </div>
    );
}

// Dummy components for each form
const ContactForm = () => <div>Contact Form</div>;
const EducationForm = () => <div>Education Form</div>;
const ExperienceForm = () => <div>Experience Form</div>;
const SkillsForm = () => <div>Skills Form</div>;
const RecipientForm = () => <div>Recipient Form</div>;
const JobDetailsForm = () => <div>Job Details Form</div>;
const GenerateForm = () => <div>Generate Form</div>;
const AISupportForm = () => <div>AI Support Form</div>;
