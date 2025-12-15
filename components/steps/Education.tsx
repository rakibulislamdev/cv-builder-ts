"use client"

import { useState, useRef, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, X, Upload, FileText, CalendarIcon, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { setCurrentStep, setCurrentSection, updateEducation } from "@/lib/cvSlice"
import NextButton from "../NextButton"
import { AchievementFile, EducationItem } from "@/lib/types/types"


export default function Education() {
    const dispatch = useDispatch()
    const education = useSelector((state: any) => state.cv.education) as EducationItem[]
    const fileInputRef = useRef<HTMLInputElement>(null)

    const parseDateString = (dateStr: string | undefined): Date | null => {
        if (!dateStr) return null
        try {
            if (dateStr.includes('/')) {
                const [day, month, year] = dateStr.split('/').map(Number)
                return new Date(year, month - 1, day)
            } else if (dateStr.includes('-')) {
                return new Date(dateStr)
            }
            return null
        } catch {
            return null
        }
    }

    const isValidDate = (date: any): date is Date => date instanceof Date && !isNaN(date.getTime())

    const initialEducationState: EducationItem[] = education.length > 0 ? education.map(edu => ({
        ...edu,
        startDate: isValidDate(parseDateString(edu.startDate as any)) ? parseDateString(edu.startDate as any) : null,
        endDate: isValidDate(parseDateString(edu.endDate as any)) ? parseDateString(edu.endDate as any) : null,
        achievements: edu.achievements || []
    })) : [
        { degree: "", institution: "", major: "", startDate: null, endDate: null, achievements: [] }
    ]

    const [educations, setEducations] = useState<EducationItem[]>(initialEducationState)
    const [uploadedFiles, setUploadedFiles] = useState<AchievementFile[]>([])

    const addEducation = () => {
        setEducations([...educations, { degree: "", institution: "", major: "", startDate: null, endDate: null, achievements: [] }])
    }

    const removeEducation = (index: number) => {
        if (educations.length > 1) {
            setEducations(educations.filter((_, i) => i !== index))
        }
    }

    const updateEducationItem = (index: number, field: keyof EducationItem, value: any) => {
        setEducations(prev => prev.map((edu, i) => i === index ? { ...edu, [field]: value } : edu))
    }

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : []
        const newFiles = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        }))
        setUploadedFiles(prev => [...prev, ...newFiles])

        const fileNames = files.map(file => file.name)
        setEducations(prev => prev.map((edu, i) => i === 0 ? { ...edu, achievements: [...edu.achievements, ...fileNames] } : edu))
    }

    const removeFile = (index: number) => {
        const fileToRemove = uploadedFiles[index]
        setUploadedFiles(prev => prev.filter((_, i) => i !== index))
        setEducations(prev => prev.map((edu, i) => i === 0 ? { ...edu, achievements: edu.achievements.filter(a => a !== fileToRemove.name) } : edu))
    }

    const handleBrowseClick = () => fileInputRef.current?.click()
    const handleButtonClick = (e: React.MouseEvent) => { e.stopPropagation(); handleBrowseClick() }

    const saveAndAdvance = (step: number) => {
        const formatted = educations.map(edu => ({
            ...edu,
            startDate: edu.startDate && isValidDate(edu.startDate) ? format(edu.startDate, 'dd/MM/yyyy') : '',
            endDate: edu.endDate && isValidDate(edu.endDate) ? format(edu.endDate, 'dd/MM/yyyy') : '',
            achievements: edu.achievements || []
        }))
        dispatch(updateEducation(formatted))
        dispatch(setCurrentStep(step))
    }

    const onSubmit = (e: React.FormEvent) => { e.preventDefault(); saveAndAdvance(5) }
    const handleCertificationsClick = () => {
        const formatted = educations.map(edu => ({
            ...edu,
            startDate: edu.startDate && isValidDate(edu.startDate) ? format(edu.startDate, 'dd/MM/yyyy') : '',
            endDate: edu.endDate && isValidDate(edu.endDate) ? format(edu.endDate, 'dd/MM/yyyy') : '',
            achievements: edu.achievements || []
        }))
        dispatch(updateEducation(formatted))
        dispatch(setCurrentSection('certifications'))
    }

    const boldGrayFocus = "focus:border-gray-500 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:shadow-sm"

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                {/* Header */}
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-800">Your Educational Background</CardTitle>
                            <CardDescription className="text-gray-600 text-base">
                                Provide your academic qualifications and any relevant certifications to strengthen your resume.
                            </CardDescription>
                        </div>
                        <Button type="button" onClick={handleCertificationsClick} className="bg-gray-800 hover:bg-gray-700 text-white">
                            Certifications <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-8">
                        {educations.map((edu, index) => (
                            <div key={index} className="space-y-6 relative">
                                {educations.length > 1 && (
                                    <Button type="button" variant="ghost" size="sm" className="absolute -top-2 right-2 p-1 h-auto hover:bg-red-50" onClick={() => removeEducation(index)}>
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                )}

                                {/* Degree */}
                                <div className="space-y-2">
                                    <Label htmlFor={`degree-${index}`} className="text-sm font-medium text-gray-700">Your Degree</Label>
                                    <Input id={`degree-${index}`} placeholder="e.g., Bachelors, Masters" value={edu.degree} onChange={(e) => updateEducationItem(index, 'degree', e.target.value)} className={cn("w-full border-gray-300", boldGrayFocus)} />
                                </div>

                                {/* Institution & Major */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor={`institution-${index}`} className="text-sm font-medium text-gray-700">Institution Name</Label>
                                        <Input id={`institution-${index}`} placeholder="e.g., University of Dhaka" value={edu.institution} onChange={(e) => updateEducationItem(index, 'institution', e.target.value)} className={cn("w-full border-gray-300", boldGrayFocus)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor={`major-${index}`} className="text-sm font-medium text-gray-700">Major</Label>
                                        <Input id={`major-${index}`} placeholder="e.g., Computer Science and Engineering" value={edu.major} onChange={(e) => updateEducationItem(index, 'major', e.target.value)} className={cn("w-full border-gray-300", boldGrayFocus)} />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Graduation</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full justify-between text-left font-normal border-gray-300", boldGrayFocus, !edu.startDate && "text-gray-400")}>
                                                    {edu.startDate && isValidDate(edu.startDate) ? format(edu.startDate, 'dd/MM/yyyy') : 'Start Date'}
                                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={edu.startDate} onSelect={(date) => updateEducationItem(index, "startDate", date)} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full justify-between text-left font-normal border-gray-300", boldGrayFocus, !edu.endDate && "text-gray-400")}>
                                                    {edu.endDate && isValidDate(edu.endDate) ? format(edu.endDate, 'dd/MM/yyyy') : 'End Date'}
                                                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={edu.endDate} onSelect={(date) => updateEducationItem(index, "endDate", date)} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Achievements */}
                                {index === 0 && (
                                    <div className="grid grid-cols-1 gap-6 w-full md:w-1/2">
                                        <Label className="text-sm font-medium text-gray-700">Achievements</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer bg-white" onClick={handleBrowseClick}>
                                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 font-medium">Drop file or browse</p>
                                            <p className="text-xs text-gray-500 mt-1 mb-3">Format: jpeg, png & Max file size: 25 MB</p>
                                            <Button type="button" variant="outline" size="sm" className="border-gray-300" onClick={handleButtonClick}>Browse Files</Button>
                                        </div>
                                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple accept=".jpeg,.jpg,.png" className="hidden" />

                                        {uploadedFiles.length > 0 && (
                                            <div className="space-y-2">
                                                {uploadedFiles.map((file, i) => (
                                                    <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-6 w-6 text-blue-500" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                                                <p className="text-xs text-gray-500">{file.size}</p>
                                                            </div>
                                                        </div>
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(i)}><X className="h-4 w-4" /></Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <hr className="border-t border-gray-200 mt-8 mb-4" />
                            </div>
                        ))}
                        <div className="flex justify-start border-t-2 border-gray-200">
                            <Button type="button" onClick={addEducation} variant="link" className="text-green-500 px-0">
                                <Plus className="h-5 w-5 mr-2 text-green-500" />
                                <span className="font-medium text-green-500">Add Another Education</span>
                            </Button>
                        </div>
                        <NextButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
