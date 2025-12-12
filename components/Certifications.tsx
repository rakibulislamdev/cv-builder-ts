"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updateCertifications, setCurrentStep, setCurrentSection } from "@/lib/cvSlice"
import { Plus, X, CalendarIcon, ChevronRight } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RootState } from "@/lib/store"

interface Certification {
    title: string
    organization: string
    issueDate: Date | null
    expiryDate: Date | null
}

export default function Certifications() {
    const dispatch = useDispatch()
    const certificationsData = useSelector((state: RootState) => state.cv.certifications)
    const currentSection = useSelector((state: RootState) => state.cv.currentSection)

    const parseDateString = (dateStr: string | undefined) => {
        if (!dateStr) return null
        try {
            const [day, month, year] = dateStr.split("/").map(Number)
            const date = new Date(year, month - 1, day)
            return date instanceof Date && !isNaN(date.getTime()) ? date : null
        } catch (error) {
            return null
        }
    }

    const isValidDate = (date: Date | null) => {
        return date instanceof Date && !isNaN(date.getTime())
    }

    const initialCertifications: Certification[] =
        certificationsData.length > 0
            ? certificationsData.map((cert: any) => ({
                ...cert,
                issueDate: parseDateString(cert.issueDate),
                expiryDate: parseDateString(cert.expiryDate),
            }))
            : [{ title: "", organization: "", issueDate: null, expiryDate: null }]

    const [certifications, setCertifications] = useState<Certification[]>(initialCertifications)

    const addCertification = () => {
        setCertifications([
            ...certifications,
            { title: "", organization: "", issueDate: null, expiryDate: null },
        ])
    }

    const removeCertification = (index: number) => {
        if (certifications.length > 1) {
            setCertifications(certifications.filter((_, i) => i !== index))
        }
    }

    const updateCertificationItem = (
        index: number,
        field: keyof Certification,
        value: any
    ) => {
        const updated = certifications.map((cert, i) =>
            i === index ? { ...cert, [field]: value } : cert
        )
        setCertifications(updated)
    }

    const saveCertifications = () => {
        const formattedCertifications = certifications.map((cert) => ({
            ...cert,
            issueDate:
                cert.issueDate && isValidDate(cert.issueDate)
                    ? format(cert.issueDate, "dd/MM/yyyy")
                    : "",
            expiryDate:
                cert.expiryDate && isValidDate(cert.expiryDate)
                    ? format(cert.expiryDate, "dd/MM/yyyy")
                    : "",
        }))

        dispatch(updateCertifications(formattedCertifications))
        return formattedCertifications
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        saveCertifications()
        dispatch(setCurrentSection("education"))
        dispatch(setCurrentStep(5))
    }

    const handleEducationClick = () => {
        saveCertifications()
        dispatch(setCurrentSection("education"))
    }

    const boldGrayFocus =
        "focus:border-gray-500 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:shadow-sm"

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                Your Certifications
                            </CardTitle>
                            <CardDescription className="text-gray-600 text-base">
                                Provide your academic qualifications and any relevant
                                certifications to strengthen your resume.
                            </CardDescription>
                        </div>

                        <Button
                            type="button"
                            onClick={handleEducationClick}
                            className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white"
                        >
                            Education
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-8">
                        {certifications.map((cert, index) => (
                            <div key={index} className="space-y-6 relative border-b pb-6 mb-6">
                                {certifications.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute -top-4 right-0 p-1 h-auto hover:bg-red-50"
                                        onClick={() => removeCertification(index)}
                                    >
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                )}

                                <div className="space-y-2">
                                    <Label
                                        htmlFor={`title-${index}`}
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Certification Title
                                    </Label>
                                    <Input
                                        id={`title-${index}`}
                                        placeholder="e.g., High BNCC"
                                        value={cert.title}
                                        onChange={(e) =>
                                            updateCertificationItem(index, "title", e.target.value)
                                        }
                                        className={cn("w-full border-gray-300", boldGrayFocus)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor={`organization-${index}`}
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Issuing Organization
                                    </Label>
                                    <Input
                                        id={`organization-${index}`}
                                        placeholder="e.g., Dhaka University"
                                        value={cert.organization}
                                        onChange={(e) =>
                                            updateCertificationItem(index, "organization", e.target.value)
                                        }
                                        className={cn("w-full md:w-1/2 border-gray-300", boldGrayFocus)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">
                                        Certificate Issue
                                    </Label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-between text-left font-normal border-gray-300",
                                                            boldGrayFocus,
                                                            !cert.issueDate && "text-gray-400"
                                                        )}
                                                    >
                                                        {cert.issueDate && isValidDate(cert.issueDate)
                                                            ? format(cert.issueDate, "dd/MM/yyyy")
                                                            : "Issue Date"}
                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={cert.issueDate ?? undefined}
                                                        onSelect={(date) =>
                                                            updateCertificationItem(index, "issueDate", date)
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="space-y-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-between text-left font-normal border-gray-300",
                                                            boldGrayFocus,
                                                            !cert.expiryDate && "text-gray-400"
                                                        )}
                                                    >
                                                        {cert.expiryDate && isValidDate(cert.expiryDate)
                                                            ? format(cert.expiryDate, "dd/MM/yyyy")
                                                            : "Expiry Date (if applicable)"}
                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={cert.expiryDate ?? undefined}
                                                        onSelect={(date) =>
                                                            updateCertificationItem(index, "expiryDate", date)
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-start">
                            <Button
                                type="button"
                                onClick={addCertification}
                                variant="link"
                                className="text-green-500 px-0"
                            >
                                <Plus className="h-5 w-5 mr-2 text-green-500" />
                                <span className="font-medium text-green-500">
                                    Add Another Certification
                                </span>
                            </Button>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 px-8 text-white font-medium"
                            >
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
