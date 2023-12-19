export interface Post {
  articleId: string
  userId: string
  userName: string
  userPicture: string
  groupId: string
  groupName: string
  title: string
  content: string
  status: string
  likeCount?: number
  commentCount?: number
  categories: any[]
  hashTags: any[]
  photos: string[] | null
  createdAt: string
}
