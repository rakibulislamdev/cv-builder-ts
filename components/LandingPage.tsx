"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
    const router = useRouter();

    const handleStartNow = (): void => {
        router.push("/resume-builder");
    };

    return (
        <div className="bg-white py-12 md:py-20 lg:py-24">
            <div className="max-w-7xl min-h-screen flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row items-center">

                    <div className="w-full md:w-1/2 flex justify-center p-6 md:p-0 mb-10 md:mb-0">
                        <Image src="/assets/frame.png" alt="frame.png" width={500} height={500} />
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
                            <span className="text-gray-900">Create Your </span>
                            <span className="text-green-600">AI-</span>
                            <span className="text-gray-900">Powered </span>
                            <span className="text-green-600">Resume</span>
                        </h1>

                        <p className="text-bold mt-6 max-w-lg md:max-w-none">
                            Let our AI technology help you build a professional resume tailored to your skills, experience, and career goals.
                        </p>

                        <p className="text-sm text-gray-500 mt-4 max-w-lg md:max-w-none">
                            Follow these simple steps to create a standout resume that will get you noticed by top employers.
                        </p>

                        <button
                            onClick={handleStartNow}
                            className="mt-12 px-8 py-3 bg-green-500 text-white font-semibold rounded shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            Start Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
