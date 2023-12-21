export interface Activity {
  activityId: string
  // 活動名稱
  activityName: string
  // 活動左上角小圖
  activityPicture: string
  // 中間大圖
  photos: string[] | null
  // 標題
  title: string
  // 2022-05-27 13:49:55 format
  startDate: string
  // 2022-05-27 13:49:55 format
  endDate: string
  // 收費方式
  chargingMethod: string
  // 活動地點
  location: string
  // 參加人數
  applicants: number
  // 活動簡介 圖文編輯器
  content: string
  // 留言 count
  commentCount: number
  // 按讚 count
  likeCount: number
}
