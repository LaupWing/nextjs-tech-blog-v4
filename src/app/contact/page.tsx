"use client"
import { FC, FormEvent, useRef, useState } from "react"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"
import { Accent } from "@/components/Accent"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, MessageSquare, User } from "lucide-react"
import { IconGithub, IconLinkedin, IconTwitter } from "@/components/Icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CustomElements extends HTMLFormControlsCollection {
    message: HTMLTextAreaElement
    email: HTMLInputElement
    name: HTMLInputElement
}

interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements
}

const Contact = () => {
    const form_ref = useRef<HTMLFormElement>(null)
    const [email_error, setEmailError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: FormEvent<CustomForm>) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify({
                email: e.currentTarget.elements.email.value,
                message: e.currentTarget.elements.message.value,
                name: e.currentTarget.elements.name.value,
            }),
        })
        const data = await res.json()
        setLoading(false)
        if (data.message === "invalid email") {
            setEmailError(true)
        } else if (data.message === "success") {
            setSuccess(true)
            form_ref.current!.reset()
        }
    }

    return (
        <>
            {loading && <ContactLoader />}
            {success && (
                <ContactSuccessModal
                    onClick={() => {
                        setSuccess(false)
                    }}
                />
            )}
            <section className="container max-w-xl py-12 md:py-20">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1
                        className="text-3xl md:text-5xl font-bold mb-4"
                        data-fade="0"
                    >
                        Let's <Accent>Connect</Accent>
                    </h1>
                    <p
                        className="text-gray-600 dark:text-gray-300"
                        data-fade="1"
                    >
                        Have a project in mind or interested in working
                        together? I'd love to hear from you.
                    </p>
                </div>

                {/* Form */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 mb-10">
                    <form
                        className="flex w-full flex-col gap-5"
                        ref={form_ref}
                        onSubmit={handleSubmit}
                    >
                        <div className="relative" data-fade="2">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                id="name"
                                required
                                placeholder="Your name"
                                className="pl-11"
                            />
                        </div>
                        <div data-fade="3">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="Your email"
                                    className={`pl-11 ${
                                        email_error ? "border-red-400" : ""
                                    }`}
                                />
                            </div>
                            {email_error && (
                                <span className="text-red-400 ml-1 font-bold uppercase text-xs mt-1 block">
                                    Email is invalid
                                </span>
                            )}
                        </div>
                        <div className="relative" data-fade="4">
                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Textarea
                                required
                                id="message"
                                className="resize-none h-32 pl-11"
                                placeholder="Your message"
                            ></Textarea>
                        </div>
                        <div data-fade="5" className="flex">
                            <Button
                                className="w-full max-w-xs"
                                variant="gradient-animation"
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Contact info */}
                <div className="text-center" data-fade="6">
                    <div className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300 mb-6">
                        <Mail className="w-5 h-5" />
                        <span>loc@laupwing.com</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Find me on
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <a
                            href="https://github.com/LaupWing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <IconGithub className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com/in/locnguyen"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <IconLinkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="https://twitter.com/laupwing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <IconTwitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Contact

interface ContactSuccessModalProps {
    onClick: () => void
}

const ContactSuccessModal: FC<ContactSuccessModalProps> = ({ onClick }) => {
    const { width, height } = useWindowSize()
    return (
        <div className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
            <Confetti width={width} height={height} />
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 z-50 max-w-md text-center shadow-xl">
                <div className="w-16 h-16 rounded-full gradient-animation mx-auto mb-4 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Thank you for reaching out! I'll get back to you as soon as
                    possible.
                </p>
                <Button onClick={onClick} variant="gradient-animation">
                    Got it
                </Button>
            </div>
        </div>
    )
}

const ContactLoader = () => {
    return (
        <div className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <Loader2 className="animate-spin" />
        </div>
    )
}
