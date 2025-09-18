import Link from "next/link"
import { Button } from "../ui/button"

export const ContactMe = () => {
    return (
        <div className="flex flex-col my-8 gap-4 items-start container">
            <div className="flex flex-col">
                <h2 className="text-sm uppercase font-bold text-gray-800">
                    Contact me
                </h2>
                <p className="text-gray-500">
                    Interested in a project or tutoring? Click on the 'Contact
                    Me' button to explore collaboration and learning
                    opportunities.
                </p>
            </div>
            <Link href="/contact">
                <Button variant="gradient-animation">Contact Me</Button>
            </Link>
        </div>
    )
}
