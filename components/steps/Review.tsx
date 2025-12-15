"use client";
import { useState, RefObject } from "react";
import { useSelector } from "react-redux";
import { Download, Briefcase, Mail, Phone, MapPinHouse } from "lucide-react";
import Image from "next/image";
import { RootState } from "@/lib/store";

interface SectionHeadingProps {
    children: React.ReactNode;
}

const SectionHeading = ({ children }: SectionHeadingProps) => (
    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2 pb-1 border-b-2 border-green-600">
        {children}
    </h3>
);

interface ResumePreviewProps {
    resumeRef?: RefObject<HTMLDivElement>;
    cvData: any;
}

const ResumePreview = ({ resumeRef, cvData }: ResumePreviewProps) => {
    const personalInfo = cvData.personalInfo || {};
    const skills = cvData.skills && cvData.skills.length > 0 ? cvData.skills : [];
    const education = cvData.education && cvData.education.length > 0 ? cvData.education : [];
    const certifications = cvData.certifications && cvData.certifications.length > 0 ? cvData.certifications : [];
    const workExperience = cvData.workExperience && cvData.workExperience.length > 0 ? cvData.workExperience : [];
    const careerSummary = cvData.careerSummary || "";
    const jobTitle = cvData.jobTitle || "";

    const displayData = {
        firstName: personalInfo.firstName || "YOUR",
        lastName: personalInfo.lastName || "NAME",
        jobTitle: jobTitle || "Your Profession",
        phone: personalInfo.phone || "+880 1XXXXXXXXX",
        email: personalInfo.email || "your.email@example.com",
        address:
            [personalInfo.address, personalInfo.city, personalInfo.state, personalInfo.zipCode, personalInfo.country]
                .filter(Boolean)
                .join(", ") || "Your Address",
        portfolio: personalInfo.portfolio || "your-portfolio.com",
        linkedin: personalInfo.linkedin || "linkedin.com/in/yourprofile",
        careerSummary:
            careerSummary ||
            "Please add your career summary to showcase your professional background and expertise.",
    };

    const displaySkills = skills.length > 0 ? skills : ["Add your skills"];
    const displayEducation = education.length > 0 ? education : [];
    const displayCertifications = certifications.length > 0 ? certifications : [];
    const displayWorkExperience = workExperience.length > 0 ? workExperience : [];

    return (
        <div
            ref={resumeRef}
            className="bg-white shadow-lg"
            style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "15mm",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >

            <div className="flex items-start gap-6 mb-6">

                <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
                        {personalInfo.profileImage ? (
                            <img src={personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Photo</div>
                        )}
                    </div>
                </div>


                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1 uppercase">
                        {displayData.firstName} {displayData.lastName}
                    </h1>
                    <p className="text-sm font-semibold text-gray-700 mb-3">{displayData.jobTitle}</p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs text-gray-700">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">
                                <Phone size={14} />
                            </span>
                            <span>{displayData.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="font-semibold">
                                <Mail size={14} />
                            </span>
                            <span>{displayData.email}</span>
                        </div>
                        <div className="flex items-start gap-1 col-span-2">
                            <span className="font-semibold">
                                <MapPinHouse size={14} />
                            </span>
                            <span>{displayData.address}</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className="h-0.5 bg-gray-300 mb-6"></div>


            <div className="flex gap-6">
                <div className="w-[30%] space-y-5">
                    <div>
                        <SectionHeading>PORTFOLIO</SectionHeading>
                        <div className="space-y-1 text-xs text-gray-700">
                            <div className="flex items-center gap-1">
                                <span className="text-green-600">
                                    <Image src="/assets/localization.png" width={18} height={18} alt="localization" />
                                </span>
                                <span className="break-all">{displayData.portfolio}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-green-600">
                                    <Image src="/assets/linkedin.png" width={18} height={18} alt="Linkedin" />
                                </span>
                                <span className="break-all">{displayData.linkedin}</span>
                            </div>
                        </div>
                    </div>


                    <div>
                        <SectionHeading>SKILLS</SectionHeading>
                        <ul className="space-y-1 text-xs text-gray-700">
                            {displaySkills.map((skill: string, index: number) => (
                                <li key={index} className="flex items-start gap-1">
                                    <span className="text-green-600 font-bold">•</span>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div>
                        <SectionHeading>LANGUAGES</SectionHeading>
                        <ul className="space-y-1 text-xs text-gray-700">
                            <li className="flex items-start gap-1">
                                <span className="text-green-600 font-bold">•</span>
                                <span>BANGLA</span>
                            </li>
                            <li className="flex items-start gap-1">
                                <span className="text-green-600 font-bold">•</span>
                                <span>ENGLISH</span>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <SectionHeading>CO-CURRICULAR ACTIVITIES</SectionHeading>
                        <ul className="space-y-1 text-xs text-gray-700">
                            <li className="flex items-start gap-1">
                                <span className="text-green-600 font-bold">•</span>
                                <span>Add your activities</span>
                            </li>
                        </ul>
                    </div>
                </div>


                <div className="w-[70%] space-y-5">

                    <div>
                        <SectionHeading>ABOUT ME</SectionHeading>
                        <p className="text-xs text-gray-700 leading-relaxed">{displayData.careerSummary}</p>
                    </div>

                    {displayEducation.length > 0 && (
                        <div>
                            <SectionHeading>EDUCATION QUALIFICATION</SectionHeading>
                            <div className="space-y-3">
                                {displayEducation.map((edu: any, index: number) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-0.5">
                                            <p className="font-bold text-xs text-gray-900">{edu.degree || "Degree Name"}</p>
                                            <p className="text-[10px] text-gray-600 font-semibold whitespace-nowrap ml-2">
                                                {edu.startDate || "Start"} – {edu.endDate || "End"}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-700">{edu.institution || "Institution Name"}</p>
                                        {edu.major && <p className="text-xs text-gray-600 italic">{edu.major}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {displayCertifications.length > 0 && (
                        <div>
                            <SectionHeading>TRAINING / CERTIFICATION</SectionHeading>
                            <div className="space-y-3">
                                {displayCertifications.map((cert: any, index: number) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-0.5">
                                            <p className="font-bold text-xs text-gray-900">{cert.title || cert.name || "Certification Name"}</p>
                                            <p className="text-[10px] text-gray-600 font-semibold whitespace-nowrap ml-2">
                                                {cert.issueDate ? `${cert.issueDate}${cert.expiryDate ? ` - ${cert.expiryDate}` : ""}` : "Date"}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-700">{cert.organization || "Organization"}</p>
                                        {cert.description && <p className="text-xs text-gray-600">{cert.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {displayWorkExperience.length > 0 && (
                        <div>
                            <SectionHeading>WORK EXPERIENCE</SectionHeading>
                            <div className="space-y-3">
                                {displayWorkExperience.map((exp: any, index: number) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-0.5">
                                            <p className="font-bold text-xs text-gray-900">{exp.jobTitle || "Job Title"}</p>
                                            <p className="text-[10px] text-gray-600 font-semibold whitespace-nowrap ml-2">
                                                {exp.startDate || "Start"} – {exp.endDate || "End"}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-800 font-semibold mb-1">{exp.company || "Company Name"}</p>
                                        {exp.description && <p className="text-xs text-gray-700 leading-relaxed">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Review() {
    const [isDownloading, setIsDownloading] = useState(false);

    const cvData = useSelector((state: RootState) => state.cv);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const html2canvas = (await import("html2canvas")).default;
            const jsPDF = (await import("jspdf")).default;

            const element = document.getElementById("resume-preview");

            if (!element) throw new Error("Resume element not found");

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(`Resume_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.pdf`);
        } catch (error) {
            console.error("Download failed:", error);
            alert("Download failed. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            <div className="bg-white border-b border-gray-200 py-6 mb-8">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-2xl font-bold text-gray-900">Review Your AI-Generated Resume</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Take a moment to review your resume. You can make changes and regenerate if needed. When you're ready, download it and start applying!
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 flex justify-center mb-8">
                <div id="resume-preview">
                    <ResumePreview cvData={cvData} />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 shadow-lg z-50">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center gap-4">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-6 cursor-pointer py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        {isDownloading ? "Downloading..." : "Download Resume"}
                    </button>

                    <button
                        onClick={() => alert("Redirecting to job search...")}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        <Briefcase size={18} />
                        Find New Favorite Job
                    </button>
                </div>
            </div>
        </div>
    );
}
