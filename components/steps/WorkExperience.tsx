"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useDispatch, useSelector } from "react-redux"
import { updateWorkExperience, setCurrentStep, updateSkills } from "@/lib/cvSlice"
import { Plus, Upload, X, FileText, CalendarIcon, ChevronRight } from "lucide-react"
import { useState, useRef, ChangeEvent, KeyboardEvent } from "react"
import { format, isValid, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import NextButton from "../NextButton"
import { RootState } from "@/lib/store"
import { Experience, UploadedFile, WorkExperienceItem } from "@/lib/types/types"



export default function WorkExperience() {
    const dispatch = useDispatch()
    const workExperience = useSelector((state: RootState) => state.cv.workExperience)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const parseDateSafe = (dateStr: string | undefined) => {
        if (!dateStr) return null
        try {
            const parsed = parse(dateStr, 'dd/MM/yyyy', new Date())
            return isValid(parsed) ? parsed : null
        } catch {
            return null
        }
    }

    const mapWorkExperience = (data: WorkExperienceItem[]): Experience[] =>
        data.map(exp => ({
            jobTitle: exp.position ?? "",
            company: exp.company ?? "",
            startDate: parseDateSafe(exp.startDate),
            endDate: parseDateSafe(exp.endDate),
            description: exp.responsibilities ?? "",
            skills: exp.skills ?? [],
            achievements: exp.achievements ?? []
        }))

    const [experiences, setExperiences] = useState<Experience[]>(
        workExperience.length > 0
            ? mapWorkExperience(workExperience)
            : [
                {
                    jobTitle: "",
                    company: "",
                    startDate: null,
                    endDate: null,
                    description: "",
                    skills: [],
                    achievements: []
                }
            ]
    )

    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const [currentSkillInputs, setCurrentSkillInputs] = useState<Record<number, string>>({})

    const addExperience = () => {
        setExperiences([...experiences, {
            jobTitle: "",
            company: "",
            startDate: null,
            endDate: null,
            description: "",
            skills: [],
            achievements: []
        }])
    }

    const removeExperience = (index: number) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter((_, i) => i !== index))
        }
    }

    const updateExperience = (index: number, field: keyof Experience, value: any) => {
        const updated = experiences.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        )
        setExperiences(updated)
    }

    const addSkill = (expIndex: number, skillText: string) => {
        if (!skillText.trim()) return
        const updatedExperiences = experiences.map((exp, i) => {
            if (i === expIndex) {
                if (exp.skills.length >= 5) return exp
                return { ...exp, skills: [...exp.skills, skillText.trim()] }
            }
            return exp
        })
        setExperiences(updatedExperiences)
        setCurrentSkillInputs(prev => ({ ...prev, [expIndex]: "" }))
    }

    const removeSkill = (expIndex: number, skillIndex: number) => {
        const updatedExperiences = experiences.map((exp, i) => {
            if (i === expIndex) {
                const updatedSkills = exp.skills.filter((_, idx) => idx !== skillIndex)
                return { ...exp, skills: updatedSkills }
            }
            return exp
        })
        setExperiences(updatedExperiences)
    }

    const handleSkillInputChange = (expIndex: number, value: string) => {
        setCurrentSkillInputs(prev => ({ ...prev, [expIndex]: value }))
    }

    const handleSkillKeyDown = (expIndex: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault()
            const skillText = currentSkillInputs[expIndex] || ""
            if (skillText.trim()) addSkill(expIndex, skillText)
        }
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        const newFiles = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        }))
        setUploadedFiles(prev => [...prev, ...newFiles])

        const fileNames = files.map(file => file.name)
        const updatedExperiences = experiences.map((exp, i) => {
            if (i === 0) return { ...exp, achievements: [...exp.achievements, ...fileNames] }
            return exp
        })
        setExperiences(updatedExperiences)
    }

    const removeFile = (index: number) => {
        const fileToRemove = uploadedFiles[index]
        setUploadedFiles(prev => prev.filter((_, i) => i !== index))

        const updatedExperiences = experiences.map((exp, i) => {
            if (i === 0) {
                const updatedAchievements = exp.achievements.filter(a => a !== fileToRemove.name)
                return { ...exp, achievements: updatedAchievements }
            }
            return exp
        })
        setExperiences(updatedExperiences)
    }

    const handleBrowseClick = () => fileInputRef.current?.click()
    const handleButtonClick = (e: any) => { e.stopPropagation(); handleBrowseClick() }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formattedExperiences: WorkExperienceItem[] = experiences.map(exp => ({
            company: exp.company,
            position: exp.jobTitle,
            startDate: exp.startDate && isValid(exp.startDate) ? format(exp.startDate, 'dd/MM/yyyy') : '',
            endDate: exp.endDate && isValid(exp.endDate) ? format(exp.endDate, 'dd/MM/yyyy') : '',
            responsibilities: exp.description,
            skills: exp.skills,
            achievements: exp.achievements
        }))
        dispatch(updateWorkExperience(formattedExperiences))
        const allSkills = experiences.flatMap(exp => exp.skills || [])
        dispatch(updateSkills([...new Set(allSkills)]))
        dispatch(setCurrentStep(4))
    }

    const onSkip = () => {
        onSubmit(new Event('submit') as unknown as React.FormEvent)
    }


    const boldGrayFocus = "focus:border-gray-500 focus:ring-2 focus:ring-gray-900 focus:ring-offset-0 focus:shadow-sm"

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl border-0 shadow-none">
                <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-800">Your Work Experience & Skills</CardTitle>
                            <CardDescription className="text-gray-600 text-base">
                                Highlight your work experience and skills. The more detail you provide, the better the AI can tailor <br /> your resume to match job opportunities.
                            </CardDescription>
                        </div>
                        <Button type="button" onClick={onSkip} variant="outline" className="bg-gray-200 hover:bg-gray-50 cursor-pointer">
                            Skip <ChevronRight />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div key={index} className="space-y-6 relative">
                                {experiences.length > 1 && (
                                    <Button type="button" variant="ghost" size="sm" className="absolute -top-2 right-2 p-1 h-auto hover:bg-red-50" onClick={() => removeExperience(index)}>
                                        <X className="h-4 w-4 text-red-500" />
                                    </Button>
                                )}


                                <div className="space-y-2">
                                    <Label htmlFor={`jobTitle-${index}`} className="text-sm font-medium text-gray-700">Job Title</Label>
                                    <Input id={`jobTitle-${index}`} placeholder="Mid-Level UI/UX Designer" value={exp.jobTitle || ""} onChange={(e) => updateExperience(index, "jobTitle", e.target.value)} className={cn("w-full border-gray-300", boldGrayFocus)} />
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor={`company-${index}`} className="text-sm font-medium text-gray-700">Company Name</Label>
                                    <Input id={`company-${index}`} placeholder="SM Technology" value={exp.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)} className={cn("w-full border-gray-300", boldGrayFocus)} />
                                </div>


                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-700">Duration</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className={cn("w-full justify-between text-left font-normal border-gray-300", boldGrayFocus, !exp.startDate && "text-gray-400")}>
                                                        {exp.startDate && isValid(exp.startDate) ? format(exp.startDate, "dd/MM/yyyy") : "Start Date"}
                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" selected={exp.startDate ?? undefined} onSelect={(date) => updateExperience(index, "startDate", date)} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className={cn("w-full justify-between text-left font-normal border-gray-300", boldGrayFocus, !exp.endDate && "text-gray-400")}>
                                                        {exp.endDate && isValid(exp.endDate) ? format(exp.endDate, "dd/MM/yyyy") : "End Date"}
                                                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar mode="single" selected={exp.endDate ?? undefined} onSelect={(date) => updateExperience(index, "endDate", date)} initialFocus />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor={`description-${index}`} className="text-sm font-medium text-gray-700">Job Description/Responsibilities</Label>
                                    <Textarea id={`description-${index}`} placeholder="Enter  Your Job Description/Responsibilities" value={exp.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} className={cn("w-full min-h-[100px] border-gray-300 resize-none", boldGrayFocus)} />
                                </div>


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="space-y-3">
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
                                                {uploadedFiles.map((file, fileIndex) => (
                                                    <div key={fileIndex} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                                                        <div className="flex items-center gap-3">
                                                            <FileText className="h-6 w-6 text-blue-500" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-700">{file.name}</p>
                                                                <p className="text-xs text-gray-500">{file.size}</p>
                                                            </div>
                                                        </div>
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(fileIndex)}>
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>


                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-gray-700">Skills</Label>
                                        <div className={cn("flex flex-wrap items-center w-full min-h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors",
                                            "focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-0 focus-within:shadow-sm",
                                            exp.skills.length >= 5 ? "opacity-70" : "")}>
                                            {exp.skills.map((skill, skillIndex) => (
                                                <div key={skillIndex} className="flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs mr-2 my-0.5">
                                                    <span>{skill}</span>
                                                    <button type="button" onClick={() => removeSkill(index, skillIndex)} className="text-gray-600 hover:text-gray-800 ml-1 transition-colors">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            <input placeholder={exp.skills.length >= 5 ? "" : "Type a skill and press Tab"} value={currentSkillInputs[index] || ""} onChange={(e) => handleSkillInputChange(index, e.target.value)} onKeyDown={(e) => handleSkillKeyDown(index, e)} disabled={exp.skills.length >= 5} className="flex-1 bg-transparent border-none outline-none ring-0 focus-visible:ring-0 shadow-none h-auto p-0 text-sm disabled:cursor-not-allowed disabled:opacity-50 min-w-[50px] my-0.5" />
                                        </div>
                                        {exp.skills.length >= 5 && <p className="text-xs text-red-500">Maximum 5 skills allowed</p>}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-start border-t-2 border-gray-200">
                            <Button type="button" onClick={addExperience} variant="link" className="text-green-500 px-0">
                                <Plus className="h-5 w-5 mr-2 text-green-500" />
                                <span className="font-medium text-green-500">Add Another Work Experience</span>
                            </Button>
                        </div>

                        <NextButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
