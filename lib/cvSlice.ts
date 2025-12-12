import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface PersonalInfo {
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

interface EducationItem {
  institution: string;
  degree: string;
  startYear: string;
  endYear: string;
  description?: string;
}

interface WorkExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities?: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface AIEnhancedData {
  personalInfo?: Partial<PersonalInfo>;
  jobTitle?: string;
  careerSummary?: string;
  skills?: string[];
  workExperience?: WorkExperienceItem[];
  education?: EducationItem[];
  certifications?: CertificationItem[];
}


interface CVState {
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


const initialState: CVState = {
  currentStep: 1,
  currentSection: "education",
  personalInfo: {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    state: "",
    zipCode: "",
    portfolio: "",
    linkedin: "",
  },
  education: [],
  workExperience: [],
  skills: [],
  certifications: [],
  contactInfo: {},
  careerSummary: "",
  jobTitle: "",
  generatedResume: "",
  isAIEnhanced: false,
};


const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSection = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateEducation: (state, action: PayloadAction<EducationItem[]>) => {
      state.education = action.payload;
    },
    updateWorkExperience: (
      state,
      action: PayloadAction<WorkExperienceItem[]>
    ) => {
      state.workExperience = action.payload;
    },
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    updateCertifications: (
      state,
      action: PayloadAction<CertificationItem[]>
    ) => {
      state.certifications = action.payload;
    },
    updateContactInfo: (state, action: PayloadAction<ContactInfo>) => {
      state.contactInfo = action.payload;
    },
    updateCareerSummary: (state, action: PayloadAction<string>) => {
      state.careerSummary = action.payload;
    },
    updateJobTitle: (state, action: PayloadAction<string>) => {
      state.jobTitle = action.payload;
    },

   
    setGeneratedResume: (state, action: PayloadAction<AIEnhancedData>) => {
      const enhancedData = action.payload;

      if (enhancedData.personalInfo) {
        state.personalInfo = { ...state.personalInfo, ...enhancedData.personalInfo };
      }

      if (enhancedData.jobTitle) {
        state.jobTitle = enhancedData.jobTitle;
      }

      if (enhancedData.careerSummary) {
        state.careerSummary = enhancedData.careerSummary;
      }

      if (enhancedData.skills) {
        state.skills = enhancedData.skills;
      }

      if (enhancedData.workExperience) {
        state.workExperience = enhancedData.workExperience;
      }

      if (enhancedData.education) {
        state.education = enhancedData.education;
      }

      if (enhancedData.certifications) {
        state.certifications = enhancedData.certifications;
      }

      state.generatedResume = JSON.stringify(enhancedData);
      state.isAIEnhanced = true;
    },

    resetForm: () => initialState,
  },
});


export const {
  setCurrentStep,
  setCurrentSection,
  updatePersonalInfo,
  updateEducation,
  updateWorkExperience,
  updateSkills,
  updateCertifications,
  updateContactInfo,
  updateCareerSummary,
  updateJobTitle,
  setGeneratedResume,
  resetForm,
} = cvSlice.actions;

export default cvSlice.reducer;
