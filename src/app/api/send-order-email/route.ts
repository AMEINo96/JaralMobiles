import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'

const resend = new Resend(process.env.RESEND_API_KEY)
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'

export async function POST(req: Request) {
  try {
    const { orderID, customerInfo, totalAmount } = await req.json()

    // Fetch dynamic store settings for custom email intro
    const storeSettings = await client.fetch(getStoreSettingsQuery)
    const customIntro = storeSettings?.orderEmailIntro 
      ? `<p style="font-size: 16px; color: #334155;">${storeSettings.orderEmailIntro}</p>`
      : `<p>Your order <strong>${orderID}</strong> has been received and is awaiting payment.</p>`

    // 1. Email to Admin
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: adminEmail,
      subject: `New Order Received - ${orderID}`,
      html: `
        <h2>New Order: ${orderID}</h2>
        <p><strong>Customer:</strong> ${customerInfo.name}</p>
        <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
        <p><strong>Total:</strong> Rs. ${totalAmount}</p>
        <p><strong>Status:</strong> Pending Payment (Waiting for WhatsApp screenshot)</p>
      `,
    })

    // 2. Email to Customer (if email is provided)
    if (customerInfo.email) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: customerInfo.email,
        subject: `Order Confirmation - ${orderID}`,
        html: `
          <h2>Thank you for your order, ${customerInfo.name}!</h2>
          ${customIntro}
          <hr style="border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3>Order Summary</h3>
          <p><strong>Order ID:</strong> ${orderID}</p>
          <p><strong>Total Amount:</strong> Rs. ${totalAmount}</p>
          <br />
          <h3>Next Steps:</h3>
          <p>Please transfer the total amount via EasyPaisa, JazzCash, or Bank Transfer and send the screenshot to our WhatsApp number to confirm your order.</p>
          <p>We will dispatch your items as soon as payment is verified.</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend Error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
