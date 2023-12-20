export interface Activity {
  activityId: string
  activityName: string
  activityPicture: string
  photos: string[] | null
  title: string
  startDate: string
  endDate: string
  chargingMethod: string
  type: string
  applicants: number
  content: string
  commentCount: number
  likeCount: number
}
