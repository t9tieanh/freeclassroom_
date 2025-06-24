import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phama9162@gmail.com',
    //pass: 'cufq tpfu etic szlu'
    pass: 'cufqtpfueticszlu'
  }
})

// Interface cho options gửi mail
export interface SendEmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

// Gửi email
export async function sendEmail(option: SendEmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: '"Phạm Tiến Anh" <phama9162@gmail.com>',
      to: option.to,
      subject: option.subject,
      text: option.text,
      html: option.html
    })

    console.log('Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}
