import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // TODO: Integrate with Resend when API key is available
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.contacts.create({
    //   email,
    //   audienceId: process.env.RESEND_AUDIENCE_ID,
    // })

    // For now, simulate success
    console.log("[v0] Newsletter subscription:", email)

    return NextResponse.json({ success: true, message: "Successfully subscribed!" })
  } catch (error) {
    console.error("[v0] Newsletter error:", error)
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 })
  }
}
