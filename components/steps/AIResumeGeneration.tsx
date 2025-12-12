"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentStep, setGeneratedResume } from "@/lib/cvSlice"
import { useState } from "react"
import type { RootState, AppDispatch } from "@/lib/store"

export default function AIResumeGeneration() {
    const dispatch = useDispatch<AppDispatch>()
    const [progress, setProgress] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState("")

    const cvData = useSelector((state: RootState) => state.cv)

    const generateResumeWithAI = async () => {
        setIsGenerating(true)
        setProgress(0)
        setError("")

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return 90
                return prev + Math.random() * 20
            })
        }, 300)

        try {
            console.log('Sending data to AI:', cvData)

            const response = await fetch('/api/generate-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cvData)
            })

            if (!response.ok) throw new Error('Resume generation failed')

            const result = await response.json()
            console.log('AI Response:', result)

            clearInterval(interval)
            setProgress(100)

            dispatch(setGeneratedResume(result.resume))

            setTimeout(() => {
                dispatch(setCurrentStep(7))
            }, 1500)

        } catch (error) {
            console.error("Resume generation failed:", error)
            clearInterval(interval)
            setError("Failed to generate resume. Please try again.")
            setIsGenerating(false)
        }
    }

    const onSubmit = () => generateResumeWithAI()

    return (
        <div className="min-h-screen bg-white flex items-start justify-center pt-[10vh] md:pt-[15vh] p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                <CardHeader className="pb-8 p-0">
                    <CardTitle className="text-4xl font-bold text-black mb-4">
                        AI Resume Magic
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base md:text-lg">
                        Now, let's turn all the information you've provided into a professional resume! Our AI will generate a polished version that showcases your strengths and matches industry standards.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col mt-12 p-0">
                    <div className="space-y-6 w-full max-w-2xl">
                        <div className="text-left">
                            <div className="text-lg font-normal text-black">
                                {isGenerating ? "AI is refining your resume..." : "Ready to generate your professional resume"}
                            </div>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
                            <div
                                className="h-full bg-green-500 rounded transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center pt-8">
                            <Button
                                type="button"
                                onClick={onSubmit}
                                disabled={isGenerating}
                                className="w-full bg-green-500 hover:bg-green-600 px-12 py-3 text-white font-medium text-lg h-12 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                size="lg"
                            >
                                {isGenerating ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Generating...
                                    </div>
                                ) : "Generate Resume"}
                            </Button>
                        </div>

                        {isGenerating && (
                            <div className="text-center text-gray-500 text-sm">
                                {Math.round(progress)}% complete
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
