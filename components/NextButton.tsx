import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function NextButton() {
    return (
        <div className="flex justify-end pt-6 mt-6">
            <Button
                type="submit"
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 px-8 text-white font-medium"
            >
                Next <ArrowRight />
            </Button>
        </div>
    );
}
