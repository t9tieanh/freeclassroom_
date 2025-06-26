import { NotificationType } from '~/enums/notification.enum'

export interface NotificationDto {
  type: NotificationType
  email: string[]
  title: string
}

export interface NewSectionNotificationDto extends NotificationDto {
  className: string
  sectionName: string
}

export interface NewPostNotificationDto extends NotificationDto {
  className: string
  postTitle: string
}

export interface VerifyOtpNotificationDto extends NotificationDto {
  otp: string
}
