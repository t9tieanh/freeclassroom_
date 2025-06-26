import { SendEmailOptions, sendEmail } from '~/utils/NodemailUtil'
import { renderTemplate } from '~/utils/templateUtil'
import { NotificationType } from '~/enums/notification.enum'

interface NotificationDto {
  type: NotificationType
  data: any
}

const send = async (notification: NotificationDto): Promise<void> => {
  const { type, data } = notification

  let subject = ''
  let to = ''
  let templateName = ''
  let templateData = {}

  switch (type) {
    case NotificationType.VERIFY_OTP:
      subject = NotificationType.VERIFY_OTP
      to = data.email
      templateName = 'otp-email.html'
      templateData = { name: data.name, otp: data.otp }
      break

    case NotificationType.NEW_POST:
      subject = NotificationType.NEW_POST
      to = data.email
      templateName = 'notification-newsection.html'
      templateData = { name: data.name, className: data.className, sectionName: data.sectionName }
      break

    // Thêm các loại khác nếu cần
    default:
      console.log(`Chưa thể gửi mail to ${data.email}: ${type}`)
      return
  }

  const html = await renderTemplate(templateName, templateData)

  const mailPayload: SendEmailOptions = {
    to,
    subject,
    text: html.replace(/<[^>]+>/g, ''), // Convert HTML to plain text thô sơ
    html
  }

  await sendEmail(mailPayload)
}

const NotificationService = {
  send
}

export default NotificationService
