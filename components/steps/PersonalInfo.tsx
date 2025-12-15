"use client"
import { useForm } from "react-hook-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux"
import { updatePersonalInfo, setCurrentStep } from "@/lib/cvSlice"
import { ChevronDown } from "lucide-react"
import NextButton from "../NextButton"
import type { RootState } from "@/lib/store"
import { PersonalInfoFormValues } from "@/lib/types/types"

const COUNTRIES: { value: string; label: string }[] = [
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "United States", label: "United States" },
    { value: "Canada", label: "Canada" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Australia", label: "Australia" },
    { value: "Germany", label: "Germany" },
]

export default function PersonalInfo() {
    const dispatch = useDispatch()

    const personalInfo = useSelector(
        (state: RootState) => state.cv.personalInfo
    )

    const defaultFormValues: PersonalInfoFormValues = {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phone: personalInfo.phone,
        email: personalInfo.email,
        country: personalInfo.country || "Bangladesh",
        city: personalInfo.city,
        address: personalInfo.address,
        state: personalInfo.state,
        zipCode: personalInfo.zipCode,
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalInfoFormValues>({
        defaultValues: defaultFormValues,
    })

    const onSubmit = (data: PersonalInfoFormValues) => {
        dispatch(updatePersonalInfo(data))
        dispatch(setCurrentStep(2))
    }


    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <Card className="w-full max-w-5xl shadow-none border-0">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Tell Us About Yourself
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                        Fill in your personal details so we can tailor your resume perfectly
                        to your career goals.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="e.g. John"
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="e.g. Doe"
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                    })}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2 col-span-1">
                                    <Label htmlFor="country">Country/Region</Label>
                                    <div className="relative">
                                        <select
                                            id="country"
                                            {...register("country")}
                                            className="w-full h-[40px] px-3 py-2 border rounded-md bg-white appearance-none"
                                        >
                                            {COUNTRIES.map((country) => (
                                                <option key={country.value} value={country.value}>
                                                    {country.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" {...register("address")} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" {...register("city")} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" {...register("state")} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input id="zipCode" {...register("zipCode")} />
                                </div>
                            </div>
                        </div>

                        <NextButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
