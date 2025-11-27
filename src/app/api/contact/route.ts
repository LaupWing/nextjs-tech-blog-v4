import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json()

        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "invalid email" }, { status: 400 })
        }

        // Save to database
        await prisma.contact.create({
            data: {
                name,
                email,
                message,
            },
        })

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: "laupwing@gmail.com",
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
            replyTo: email,
        })

        return NextResponse.json({ message: "success" })
    } catch (error) {
        console.error("Contact form error:", error)
        return NextResponse.json({ message: "error" }, { status: 500 })
    }
}
