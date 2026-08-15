import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'

export async function POST(req: Request) {
  try {
    const { ticketID, customerInfo, deviceDetails } = await req.json()

    // Fetch dynamic store settings for custom email intro
    const storeSettings = await client.fetch(getStoreSettingsQuery)
    const customIntro = storeSettings?.repairEmailIntro 
      ? `<p style="font-size: 16px; color: #334155;">${storeSettings.repairEmailIntro}</p>`
      : `<p>Your repair ticket <strong>${ticketID}</strong> has been created for your ${deviceDetails.brand} ${deviceDetails.model}.</p>`

    const address = storeSettings?.address || '123 Tech Avenue, Hafeez Center, Lahore'

    // 1. Email to Admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: adminEmail,
      subject: `New Repair Ticket - ${ticketID}`,
      html: `
        <h2>New Repair Request: ${ticketID}</h2>
        <p><strong>Customer:</strong> ${customerInfo.name}</p>
        <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        <p><strong>Email:</strong> ${customerInfo.email || 'N/A'}</p>
        <hr />
        <h3>Device Info:</h3>
        <p><strong>Brand:</strong> ${deviceDetails.brand}</p>
        <p><strong>Model:</strong> ${deviceDetails.model}</p>
        <p><strong>Issue:</strong> ${deviceDetails.issueType}</p>
      `,
    })

    // 2. Email to Customer (if email is provided)
    if (customerInfo.email) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: customerInfo.email,
        subject: `Repair Ticket Created - ${ticketID}`,
        html: `
          <h2>Hello ${customerInfo.name},</h2>
          ${customIntro}
          <hr style="border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3>Drop-off & Shipping Instructions:</h3>
          <p>If you are dropping off your device in person, please visit us at:</p>
          <p><strong>${address}</strong></p>
          <p>If you are mailing it in, please securely package your device (without accessories unless relevant to the issue) and ship it to the address above. Please write your Ticket ID clearly on the outside of the box.</p>
          <p>We will contact you with a diagnostic report and quote once we receive the device.</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend Error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
