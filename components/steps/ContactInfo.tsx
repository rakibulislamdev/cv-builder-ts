"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updateContactInfo, setCurrentStep, updatePersonalInfo } from "@/lib/cvSlice"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import NextButton from "../NextButton"
import type { RootState, AppDispatch } from "@/lib/store"
import { OtherSocial } from "@/lib/types/types"

type FormValues = {
    linkedin?: string
    portfolio?: string
    otherSocial?: OtherSocial | null
}

export default function ContactInfo() {
    const dispatch = useDispatch<AppDispatch>()
    const contactInfo = useSelector((state: RootState) => state.cv.contactInfo)

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: contactInfo
    })

    const [otherSocial, setOtherSocial] = useState<OtherSocial>(
        contactInfo.otherSocial || { platform: "", url: "" }
    )

    const updateOtherSocial = (field: keyof OtherSocial, value: string) => {
        setOtherSocial(prev => ({ ...prev, [field]: value }))
    }

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const formData = {
            ...data,
            otherSocial: otherSocial.platform && otherSocial.url ? otherSocial : null
        }

        dispatch(updateContactInfo(formData))
        dispatch(updatePersonalInfo({ portfolio: data.portfolio, linkedin: data.linkedin }))
        dispatch(setCurrentStep(6))
    }



    const isValidUrl = (url: string) => {
        try { new URL(url); return true } catch { return false }
    }

    const boldGrayFocus = "focus:border-gray-500 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:shadow-sm"

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Your Contact Information
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Include additional contact details and social media links to showcase your professional presence.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* LinkedIn */}
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">Linkedin Profile</Label>
                            <Input
                                id="linkedin"
                                placeholder="Enter your LinkedIn profile URL"
                                {...register("linkedin", {
                                    validate: value => !value || isValidUrl(value) || "Please enter a valid URL"
                                })}
                                className={`w-full border-gray-300 ${boldGrayFocus} ${errors.linkedin ? 'border-red-500' : ''}`}
                            />
                            {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
                        </div>

                        {/* Portfolio */}
                        <div className="space-y-2">
                            <Label htmlFor="portfolio">Personal Website/Portfolio</Label>
                            <Input
                                id="portfolio"
                                placeholder="Enter your personal website or portfolio URL"
                                {...register("portfolio", {
                                    validate: value => !value || isValidUrl(value) || "Please enter a valid URL"
                                })}
                                className={`w-full border-gray-300 ${boldGrayFocus} ${errors.portfolio ? 'border-red-500' : ''}`}
                            />
                            {errors.portfolio && <p className="text-red-500 text-sm">{errors.portfolio.message}</p>}
                        </div>

                        {/* Other Social Media */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Platform Select */}
                                <div className="space-y-2 col-span-1">
                                    <Label>Others Social Media</Label>
                                    <Select
                                        value={otherSocial.platform}
                                        onValueChange={(value) => updateOtherSocial("platform", value)}
                                    >
                                        <SelectTrigger className={`w-full !h-[39px] border-gray-300 ${boldGrayFocus}`}>
                                            <SelectValue placeholder="Select Platform" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="facebook">Facebook</SelectItem>
                                            <SelectItem value="instagram">Instagram</SelectItem>
                                            <SelectItem value="github">GitHub</SelectItem>
                                            <SelectItem value="youtube">YouTube</SelectItem>
                                            <SelectItem value="tiktok">TikTok</SelectItem>
                                            <SelectItem value="pinterest">Pinterest</SelectItem>
                                            <SelectItem value="snapchat">Snapchat</SelectItem>
                                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                            <SelectItem value="telegram">Telegram</SelectItem>
                                            <SelectItem value="discord">Discord</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* URL Input */}
                                <div className="space-y-2 col-span-2">
                                    <Label>URL</Label>
                                    <Input
                                        placeholder="https://example.com"
                                        value={otherSocial.url}
                                        onChange={(e) => updateOtherSocial("url", e.target.value)}
                                        className={`w-full border-gray-300 ${boldGrayFocus} ${otherSocial.url && !isValidUrl(otherSocial.url) ? 'border-red-500' : ''}`}
                                    />
                                    {otherSocial.url && !isValidUrl(otherSocial.url) && (
                                        <p className="text-red-500 text-sm">Enter other social media profiles (optional)</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <NextButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
