export interface Event {
  eventId: string
  userId: string
  userName: string
  userPicture: string
  groupId: string
  groupName: string
  name: string
  info: string
  address: string
  commentCount: number
  likeCount: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  isFree: boolean
  isOnline: boolean
  image: string
  price?: number
  enrolledCount?: number
  createdAt: string
}
