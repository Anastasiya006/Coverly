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
        { name: "AI Support", icon: "M1 8.849c0 1 .738 1.851 1.734 1.947L3 10.82v2.429a.75.75 0 0 0 1.28.53l1.82-1.82A3.484 3.484 0 0 1 5.5 10V9A3.5 3.5 0 0 1 9 5.5h4V4.151c0-1-.739-1.851-1.734-1.947a44.539 44.539 0 0 0-8.532 0C1.738 2.3 1 3.151 1 4.151V8.85Z M7 9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.25v1.25a.75.75 0 0 1-1.28.53L9.69 12H9a2 2 0 0 1-2-2V9Z" },
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
            <div className="w-4/10">
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

// components for each form
const ContactForm = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-lg text-[#2B273F] h-full">
            <h2 className="text-lg font-bold mb-1">Contact Information</h2>
            <p className="text-sm font-normal text-left text-gray-400 mb-6">Enter your contact details.</p>
            
            <div className="mb-3">
                <label className="block text-sm font-medium">Full Name</label>
                <input 
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="John Doe"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">Email</label>
                <input 
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="example@email.com"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">Phone</label>
                <input 
                    type="tel"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="(123) 456-7890"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">LinkedIn</label>
                <input 
                    type="url"
                    name="linkedin"
                    value={contact.linkedin}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="linkedin.com/in/name"
                />
            </div>
        </div>
    );
};

const EducationForm = () => {
    const [education, setEducation] = useState({
        school: "",
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
    });

    const degrees = ["High School Diploma", "Associate's", "Bachelor's", "Master's", "PhD", "Other"];

    const handleChange = (e) => {
        setEducation({ ...education, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-lg text-[#2B273F] h-full">
            <h2 className="text-lg font-bold mb-1">Education</h2>
            <p className="text-sm font-normal text-left text-gray-400 mb-6">Enter your most recent education.</p>

            {/* School Name */}
            <div className="mb-3">
                <label className="block text-sm font-medium">School Name</label>
                <input
                    type="text"
                    name="school"
                    value={education.school}
                    onChange={handleChange}
                    placeholder="University of Waterloo"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                />
            </div>

            {/* Degree Dropdown */}
            <div className="mb-3">
                <label className="block text-sm font-medium">Degree</label>
                <select
                    name="degree"
                    value={education.degree}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                >
                    <option value="">Select Degree</option>
                    {degrees.map((deg, index) => (
                        <option key={index} value={deg}>
                            {deg}
                        </option>
                    ))}
                </select>
            </div>

            {/* Field of Study */}
            <div className="mb-3">
                <label className="block text-sm font-medium">Field of Study</label>
                <input
                    type="text"
                    name="fieldOfStudy"
                    value={education.fieldOfStudy}
                    onChange={handleChange}
                    placeholder="Computer Engineering"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                />
            </div>

            {/* Graduation Year */}
            <div className="mb-3">
                <label className="block text-sm font-medium">Graduation Year</label>
                <input
                    type="number"
                    name="graduationYear"
                    value={education.graduationYear}
                    onChange={handleChange}
                    placeholder="YYYY"
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                />
            </div>
        </div>
    );
};

const ExperienceForm = () => <div>Experience Form</div>;

const SkillsForm = () => {
    const [skills, setSkills] = useState([
        { skill: "", level: "" }
    ]);

    const skillLevels = ["Beginner", "Intermediate", "Advanced"];

    const handleSkillChange = (e, index) => {
        const newSkills = [...skills];
        newSkills[index][e.target.name] = e.target.value;
        setSkills(newSkills);
    };

    const handleAddSkill = () => {
        setSkills([...skills, { skill: "", level: "" }]);
    };

    const handleRemoveSkill = (index) => {
        const newSkills = skills.filter((_, i) => i !== index);
        setSkills(newSkills);
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-lg text-[#2B273F] h-full">
            <h2 className="text-lg font-bold mb-4">Skills</h2>

            {skills.map((skill, index) => (
                <div key={index} className="mb-4">
                    {/* Skill Name */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Skill {index + 1}</label>
                        <input
                            type="text"
                            name="skill"
                            value={skill.skill}
                            onChange={(e) => handleSkillChange(e, index)}
                            placeholder="Enter skill name"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>

                    {/* Skill Level Dropdown */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">Skill Level</label>
                        <select
                            name="level"
                            value={skill.level}
                            onChange={(e) => handleSkillChange(e, index)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Select Skill Level</option>
                            {skillLevels.map((level, i) => (
                                <option key={i} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Remove Skill Button */}
                    <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                    >
                        Remove Skill
                    </button>
                </div>
            ))}

            {/* Add More Skills Button */}
            <button
                type="button"
                onClick={handleAddSkill}
                className="text-blue-500 hover:text-blue-700 text-sm"
            >
                Add More Skills
            </button>
        </div>
    );
};

const RecipientForm = () => {
    const [contact, setContact] = useState({
        company: "",
        street: "",
        city: "",
        state: "",
        zipcode: ""
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-lg text-[#2B273F] h-full">
            <h2 className="text-lg font-bold mb-1">Recipient Information</h2>
            <p className="text-sm font-normal text-left text-gray-400 mb-6">Enter your recipient's details.</p>
            
            <div className="mb-3">
                <label className="block text-sm font-medium">Company</label>
                <input 
                    type="text"
                    name="company"
                    value={contact.company}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="Coverly"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">Street</label>
                <input 
                    type="text"
                    name="street"
                    value={contact.street}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="123 Main Street"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">City</label>
                <input 
                    type="text"
                    name="city"
                    value={contact.city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="New York"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">State</label>
                <input 
                    type="text"
                    name="state"
                    value={contact.state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="NY"
                />
            </div>

            <div className="mb-3">
                <label className="block text-sm font-medium">Zip Code</label>
                <input 
                    type="text"
                    name="zipcode"
                    value={contact.zipcode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal"
                    placeholder="10001"
                />
            </div>
        </div>
    );
};



const JobDetailsForm = () => {
    const [jobDetails, setJobDetails] = useState("");

    const handleChange = (e) => {
        setJobDetails({ jobDetails, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-4 rounded-md shadow-lg text-[#2B273F] h-full">
            <h2 className="text-lg font-bold mb-1">Job Details</h2>
            <p className="text-sm font-normal text-left text-gray-400 mb-6">Paste the job posting description.</p>
            
            <div className="mb-3">
                <label className="block text-sm font-medium">Description</label>
                <textarea 
                    name="jobDetails"
                    value={jobDetails}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm font-normal resize-none overflow-y-auto"
                    placeholder="Paste here..."
                    rows="22"
                />
            </div>
        </div>
    );
};




const GenerateForm = () => <div>Generate Form</div>;

const AISupportForm = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message) return;

    // Add the user's message to chat history
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    setMessage('');

    try {
      // Send user message to Flask backend
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.response) {
        setChatHistory([...chatHistory, { sender: 'user', text: message }, { sender: 'ai', text: data.response }]);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error sending message to the backend:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-lg text-[#2B273F] h-full">
      <h2 className="text-lg font-bold mb-1">AI Support</h2>
      <div>
        {chatHistory.map((chat, index) => (
          <div key={index} className={chat.sender}>
            <strong>{chat.sender === 'user' ? 'You: ' : 'AI: '}</strong>
            <span>{chat.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

