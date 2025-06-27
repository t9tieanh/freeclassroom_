/* eslint-disable no-case-declarations */
import { SendEmailOptions, sendEmail } from '~/utils/NodemailUtil'
import { renderTemplate } from '~/utils/templateUtil'
import { NotificationType } from '~/enums/notification.enum'
import {
  NotificationDto,
  VerifyOtpNotificationDto,
  NewSectionNotificationDto,
  NewPostNotificationDto
} from '~/dto/request/notification.dto'

// send message
const send = async (notification: NotificationDto): Promise<void> => {
  let subject = ''
  const to = []
  let templateName = ''
  let templateData = {}

  switch (notification.type) {
    case NotificationType.VERIFY_OTP:
      const otpNotification = notification as VerifyOtpNotificationDto

      subject = NotificationType.VERIFY_OTP
      to.push(...otpNotification.email)
      templateName = 'otp-email.html'
      templateData = { name: otpNotification.title, otp: otpNotification.otp }
      break

    case NotificationType.NEW_SECTION:
      const sectionNotification = notification as NewSectionNotificationDto

      subject = NotificationType.NEW_SECTION
      to.push(...sectionNotification.email)
      templateName = 'notification-newsection.html'
      templateData = {
        name: sectionNotification.title,
        className: sectionNotification.className,
        sectionName: sectionNotification.sectionName
      }
      break

    case NotificationType.NEW_POST:
      const postNotification = notification as NewPostNotificationDto

      subject = NotificationType.NEW_POST
      to.push(...postNotification.email)
      templateName = 'notification-newpost.html'
      templateData = {
        name: postNotification.title,
        className: postNotification.className,
        postTitle: postNotification.postTitle
      }
      break

    // Thêm các loại khác nếu cần
    default:
      console.log(`Chưa thể gửi mail to ${notification.email}: ${notification.type}`)
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
