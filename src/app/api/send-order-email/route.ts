import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'
import { sendEmail } from '@/lib/gmail'

const adminEmail = process.env.EMAIL_USER || process.env.ADMIN_EMAIL || 'admin@example.com'

export async function POST(req: Request) {
  try {
    const { orderID, customerInfo, billing, cartItems } = await req.json()

    // Fetch dynamic store settings for custom email intro
    const storeSettings = await client.fetch(getStoreSettingsQuery)
    const customIntro = storeSettings?.orderEmailIntro 
      ? `<p style="font-size: 16px; color: #334155;">${storeSettings.orderEmailIntro}</p>`
      : `<p>Your order <strong>${orderID}</strong> has been received and is awaiting payment.</p>`

    const formattedAddress = `${customerInfo.addressLine}, ${customerInfo.city}, ${customerInfo.province}, ${customerInfo.country}${customerInfo.landmark ? ` (Landmark: ${customerInfo.landmark})` : ''}`

    const itemsHtml = cartItems && cartItems.length > 0 
      ? `
        <h3>Items Ordered:</h3>
        <ul style="list-style-type: none; padding: 0;">
          ${cartItems.map((item: any) => `
            <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <strong>${item.quantity}x ${item.title}</strong> - Rs. ${item.price * item.quantity}
            </li>
          `).join('')}
        </ul>
      `
      : ''

    // 1. Email to Admin
    await sendEmail({
      to: adminEmail,
      subject: `New Order Received - ${orderID}`,
      html: `
        <h2>New Order: ${orderID}</h2>
        <p><strong>Customer:</strong> ${customerInfo.name}</p>
        <p><strong>Phone:</strong> ${customerInfo.phone}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
        <p><strong>Address:</strong> ${formattedAddress}</p>
        <hr />
        ${itemsHtml}
        <hr />
        <h3>Billing Summary:</h3>
        <p><strong>Subtotal:</strong> Rs. ${billing.subtotal}</p>
        <p><strong>Shipping Fee:</strong> Rs. ${billing.shippingFee}</p>
        ${billing.taxAmount > 0 ? `<p><strong>Tax:</strong> Rs. ${billing.taxAmount}</p>` : ''}
        <p><strong>Total:</strong> Rs. ${billing.finalTotal}</p>
        <hr />
        <p><strong>Status:</strong> Pending Payment (Waiting for WhatsApp screenshot)</p>
      `,
    })

    // 2. Email to Customer (if email is provided)
    if (customerInfo.email) {
      await sendEmail({
        to: customerInfo.email,
        subject: `Order Confirmation - ${orderID}`,
        html: `
          <h2>Thank you for your order, ${customerInfo.name}!</h2>
          ${customIntro}
          <hr style="border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3>Order Summary</h3>
          <p><strong>Order ID:</strong> ${orderID}</p>
          <p><strong>Shipping Address:</strong> ${formattedAddress}</p>
          <br />
          ${itemsHtml}
          <br />
          <table style="width: 100%; text-align: left; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Subtotal</td>
              <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid #e2e8f0;">Rs. ${billing.subtotal}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Shipping</td>
              <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid #e2e8f0;">${billing.shippingFee > 0 ? `Rs. ${billing.shippingFee}` : 'Free'}</td>
            </tr>
            ${billing.taxAmount > 0 ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">Tax</td>
              <td style="padding: 8px 0; text-align: right; border-bottom: 1px solid #e2e8f0;">Rs. ${billing.taxAmount}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; font-weight: bold; font-size: 16px;">Total</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 16px;">Rs. ${billing.finalTotal}</td>
            </tr>
          </table>
          <br />
          <h3>Next Steps:</h3>
          <p>Please transfer the total amount via EasyPaisa, JazzCash, or Bank Transfer and send the screenshot to our WhatsApp number to confirm your order.</p>
          <p>We will dispatch your items as soon as payment is verified.</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Gmail API Error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
