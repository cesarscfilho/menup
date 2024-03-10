import { env } from "@/env.mjs"
import { Resend } from "resend"

const resend = new Resend(env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, url: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm sign in",
    html: `<p>Click <a href="${url}">here</a> to cofirm email.</p>"`,
  })
}
