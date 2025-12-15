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

export interface Certification {
    title: string
    organization: string
    issueDate: Date | null
    expiryDate: Date | null
}




export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  state: string;
  zipCode: string;
  portfolio: string;
  linkedin: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface WorkExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

export interface AIEnhancedData {
  personalInfo?: Partial<PersonalInfo>;
  jobTitle?: string;
  careerSummary?: string;
  skills?: string[];
  workExperience?: WorkExperienceItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
}


export interface CVState {
  currentStep: number;
  currentSection: string;
  personalInfo: PersonalInfo;
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: string[];
  certifications: CertificationItem[];
  contactInfo: ContactInfo;
  careerSummary: string;
  jobTitle: string;
  generatedResume: string;
  isAIEnhanced: boolean;
}
