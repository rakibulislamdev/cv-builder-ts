export interface PersonalInfoFormValues {
    firstName: string
    lastName: string
    phone: string
    email: string
    country: string
    city: string
    address: string
    state: string
    zipCode: string
}

export type FormValues = {
    jobTitle: string
    summary: string
}

export interface AchievementFile {
    file: File
    preview: string
    name: string
    size: string
}

export interface EducationItem {
    degree: string
    institution: string
    major: string
    startDate: Date | null
    endDate: Date | null
    achievements: string[]
}

export type OtherSocial = {
    platform: string
    url: string
}


export interface Experience {
    jobTitle: string
    company: string
    startDate: Date | null
    endDate: Date | null
    description: string
    skills: string[]
    achievements: string[]
}

export interface UploadedFile {
    file: File
    preview: string
    name: string
    size: string
}


export interface WorkExperienceItem {
    company: string
    position: string
    startDate: string
    endDate: string
    responsibilities?: string
    skills?: string[]
    achievements?: string[]
}