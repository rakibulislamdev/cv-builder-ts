"use client"

import { useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { updatePersonalInfo, setCurrentStep } from "@/lib/cvSlice"
import { RootState } from "@/lib/store"

interface PersonalInfoState {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
}

export default function PersonalInfo() {
    const dispatch = useDispatch()
    const savedInfo = useSelector((state: RootState) => state.cv.personalInfo)

    const [personalInfo, updatePersonalInfoState] = useState<PersonalInfoState>({
        firstName: savedInfo.firstName || "",
        lastName: savedInfo.lastName || "",
        email: savedInfo.email || "",
        phone: savedInfo.phone || "",
        address: savedInfo.address || "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        updatePersonalInfoState((prev) => ({ ...prev, [name]: value }))
    }

    const handleNext = () => {
        dispatch(updatePersonalInfo(personalInfo))
        dispatch(setCurrentStep(2))
    }

    const handleBack = () => {
        dispatch(setCurrentStep(0))
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <div className="w-full max-w-3xl space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={personalInfo.firstName}
                            onChange={handleChange}
                            placeholder="John"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={personalInfo.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={personalInfo.phone}
                            onChange={handleChange}
                            placeholder="+8801XXXXXXXXX"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={personalInfo.address}
                            onChange={handleChange}
                            placeholder="123, Dhaka, Bangladesh"
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    <Button onClick={handleBack} variant="outline">
                        Back
                    </Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
            </div>
        </div>
    )
}
