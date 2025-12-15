"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { updateCareerSummary, setCurrentStep, updateJobTitle } from "@/lib/cvSlice"
import NextButton from "../NextButton"
import type { RootState, AppDispatch } from "@/lib/store"
import { FormValues } from "@/lib/types/types"



export default function CareerSummary() {
    const dispatch = useDispatch<AppDispatch>()
    const careerSummary = useSelector((state: RootState) => state.cv.careerSummary)
    const jobTitle = useSelector((state: RootState) => state.cv.jobTitle)

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: { jobTitle: jobTitle || "", summary: careerSummary || "" }
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updateCareerSummary(data.summary))
        dispatch(updateJobTitle(data.jobTitle))
        dispatch(setCurrentStep(3))
    }



    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Career Overview
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        A strong career summary will make a lasting impression on recruiters. Let&apos;s create a summary that <br /> highlights your experience and goals.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
                            <Input
                                id="jobTitle"
                                placeholder="Enter your most recent or current job title"
                                {...register("jobTitle")}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="summary" className="text-sm font-medium">Career Summary</Label>
                            <Textarea
                                id="summary"
                                placeholder="An experienced marketing professional..."
                                {...register("summary")}
                                className="w-full min-h-[120px]"
                            />
                        </div>

                        <NextButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
