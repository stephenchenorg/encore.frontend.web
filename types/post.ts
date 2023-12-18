export interface Post {
  articleId: string
  userId: string
  userName: string
  userPicture: string
  hasFami: boolean
  famiBarcode: string
  groupId: string
  groupName: string
  title: string
  content: string
  status: string
  allowContentAuth: boolean
  categories: any[]
  hashTags: any[]
  photos: string[] | null
  createdAt: string
}
