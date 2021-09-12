export class UserNotification {
    constructor(notification) {
      if (notification) {
        this.title = notification.title || ''
        this.message = notification.message || ''
        this.autoClose = notification.autoClose || false
      }
      // this.id = FuseUtils.generateGUID()
    }
    id: string
    title: string
    message: string
    autoClose: boolean
    viewed: boolean
  }
  