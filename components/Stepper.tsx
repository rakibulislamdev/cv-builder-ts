"use client";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep } from "@/lib/cvSlice";
import { RootState } from "@/lib/store";

const steps = [
    { number: "01", title: "Personal Information" },
    { number: "02", title: "Career Summary" },
    { number: "03", title: "Skills & Experience" },
    { number: "04", title: "Education & Certifications" },
    { number: "05", title: "Contact Information" },
    { number: "06", title: "AI Resume Generation" },
    { number: "07", title: "Review & Download" },
];

export default function Stepper() {
    const dispatch = useDispatch();
    const currentStep = useSelector(
        (state: RootState) => state.cv.currentStep
    );

    const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="w-full px-4 py-6 sm:px-6 sm:py-10 bg-white">
            <div className="relative max-w-7xl mx-auto">

                {/* DESKTOP VERSION */}
                <div className="hidden lg:block relative">
                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => {
                            const stepNum = index + 1;
                            const isActive = stepNum === currentStep;
                            const isCompleted = stepNum < currentStep;
                            const isClickable = stepNum <= currentStep + 1;

                            return (
                                <div
                                    key={step.number}
                                    className="flex flex-col items-center cursor-pointer relative"
                                    onClick={() => isClickable && dispatch(setCurrentStep(stepNum))}
                                >
                                    {index < steps.length - 1 && (
                                        <>
                                            <div
                                                className="absolute top-6 h-1 bg-gray-300"
                                                style={{
                                                    left: "50%",
                                                    width: "calc(100vw / 7)",
                                                    zIndex: 0,
                                                }}
                                            ></div>

                                            {stepNum < currentStep && (
                                                <div
                                                    className="absolute top-6 h-1 bg-green-500 transition-all duration-500"
                                                    style={{
                                                        left: "50%",
                                                        width: "calc(100vw / 7)",
                                                        zIndex: 0,
                                                    }}
                                                ></div>
                                            )}
                                        </>
                                    )}

                                    <div className="relative">
                                        <div
                                            className="absolute inset-0 w-12 h-12 rounded-full bg-white"
                                            style={{ zIndex: 1 }}
                                        ></div>

                                        <div
                                            className={`
                                                w-12 h-12 rounded-full flex items-center justify-center
                                                font-bold text-lg border-2 transition-all relative
                                                ${isCompleted || isActive
                                                    ? "bg-green-500 text-white border-green-500"
                                                    : "bg-gray-300 text-gray-600 border-gray-300"
                                                }
                                                ${isClickable
                                                    ? "hover:scale-105"
                                                    : "cursor-not-allowed opacity-50"
                                                }
                                            `}
                                            style={{ zIndex: 2 }}
                                        >
                                            {step.number}
                                        </div>
                                    </div>

                                    <div className="mt-3 text-center min-w-[70px]">
                                        <span
                                            className={`
                                                block text-sm font-medium
                                                ${isActive || isCompleted
                                                    ? "text-green-600 font-bold"
                                                    : "text-gray-500"
                                                }
                                                ${isClickable ? "hover:text-green-600" : ""}
                                            `}
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* MOBILE VERSION */}
                <div className="lg:hidden">
                    <div
                        className="absolute left-6 top-0 bottom-0 w-1 bg-gray-300"
                        style={{ zIndex: 0 }}
                    ></div>

                    <div
                        className="absolute left-6 top-0 w-1 bg-green-500 transition-all duration-500"
                        style={{
                            height: `calc(${progressWidth}%)`,
                            zIndex: 0,
                        }}
                    ></div>

                    <div className="flex flex-col space-y-6 relative z-10">
                        {steps.map((step, index) => {
                            const stepNum = index + 1;
                            const isActive = stepNum === currentStep;
                            const isCompleted = stepNum < currentStep;
                            const isClickable = stepNum <= currentStep + 1;

                            return (
                                <div
                                    key={step.number}
                                    className="flex items-center cursor-pointer"
                                    onClick={() => isClickable && dispatch(setCurrentStep(stepNum))}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div
                                            className="absolute inset-0 w-12 h-12 rounded-full bg-white"
                                            style={{ zIndex: 1 }}
                                        ></div>

                                        <div
                                            className={`
                                                w-12 h-12 rounded-full flex items-center justify-center
                                                font-bold text-lg border-2 transition-all relative
                                                ${isCompleted || isActive
                                                    ? "bg-green-500 text-white border-green-500"
                                                    : "bg-gray-300 text-gray-600 border-gray-300"
                                                }
                                                ${isClickable
                                                    ? "hover:scale-105"
                                                    : "cursor-not-allowed opacity-50"
                                                }
                                            `}
                                            style={{ zIndex: 2 }}
                                        >
                                            {step.number}
                                        </div>
                                    </div>

                                    <div className="ml-4">
                                        <span
                                            className={`
                                                block text-base font-medium
                                                ${isActive || isCompleted
                                                    ? "text-green-600 font-bold"
                                                    : "text-gray-500"
                                                }
                                                ${isClickable ? "hover:text-green-600" : ""}
                                            `}
                                        >
                                            {step.title}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
