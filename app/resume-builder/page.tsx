"use client";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Stepper from "@/components/Stepper";
import PersonalInfo from "@/components/steps/PersonalInfo";
import CareerSummary from "@/components/steps/CareerSummary";
import WorkExperience from "@/components/steps/WorkExperience";
import Education from "@/components/steps/Education";
import ContactInfo from "@/components/steps/ContactInfo";
import Review from "@/components/steps/Review";
import Certifications from "@/components/Certifications";
import AIResumeGeneration from "@/components/steps/AIResumeGeneration";
import { RootState } from "@/lib/store";

export default function ResumeBuilder() {
    const currentStep = useSelector((state: RootState) => state.cv.currentStep);
    const currentSection = useSelector((state: RootState) => state.cv.currentSection);

    if (currentSection === "certifications") {
        return (
            <div className="min-h-screen bg-white">
                <Stepper />
                <AnimatePresence mode="wait">
                    <motion.div
                        key="certifications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Certifications />
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfo />;
            case 2:
                return <CareerSummary />;
            case 3:
                return <WorkExperience />;
            case 4:
                return <Education />;
            case 5:
                return <ContactInfo />;
            case 6:
                return <AIResumeGeneration />;
            case 7:
                return <Review />;
            default:
                return <PersonalInfo />;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Stepper />
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
