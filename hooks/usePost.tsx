import { createContext, useContext, useEffect, useState } from 'react'
import { useHandleScroll } from './useHandleScroll'
import { getURL } from '../utils/helpers'

type PostContextType = {
  post: Post
  preview: boolean
  likeCount: number
  setLikeCount: any
  isLike: boolean | string
  setIsLike: any
  handleLikeCount: () => void
  viewCount: number
  setViewCount: any
  isScrollDown: boolean
  language: string
}
type PostContextProviderType = {
  post: Post
  preview: boolean
  language: string
  children: React.ReactNode
}

const PostContext = createContext<PostContextType | null>(null)

export function usePost() {
  return useContext(PostContext)
}


export function PostContextProvider({
  post,
  language,
  preview,
  children,
}: PostContextProviderType) {
  const [likeCount, setLikeCount] = useState(post.likeCount || 0)
  const [viewCount, setViewCount] = useState(post.viewCount || 0)
  const [isLike, setIsLike] = useState<boolean | string>('loading')
  const { isScrollDown } = useHandleScroll()

  useEffect(() => {
    async function increaseViewCount() {
      await fetch(`${getURL()}api/count?postID=${post._id}&type=view`, {
        method: 'POST',
      })
    }
    if (process.env.NODE_ENV === 'production' && preview === false) {
      setViewCount((count) => count + 1)
      increaseViewCount()
    }

    const getItem = JSON.parse(localStorage.getItem('like')) || []
    setIsLike(getItem.includes(post._id))
  }, [])

  async function handleLikeCount() {
    setLikeCount((count: number) => count + (!isLike ? 1 : -1))
    setIsLike((prev) => !prev)

    const like = await fetch(
      `${getURL()}api/count?postID=${post._id}&type=like&val=${
        !isLike ? 1 : -1
      }`,
      {
        method: 'POST',
      }
    )
    if (like.ok) {
      const getItem = JSON.parse(localStorage.getItem('like')) || []
      if (!isLike) {
        localStorage.setItem('like', JSON.stringify([...getItem, post._id]))
      } else {
        const index = getItem.indexOf(post._id)
        localStorage.setItem(
          'like',
          JSON.stringify([
            ...getItem.slice(0, index),
            ...getItem.slice(index + 1),
          ])
        )
      }
    }
  }

  const values = {
    post,
    likeCount,
    setLikeCount,
    isLike,
    setIsLike,
    viewCount,
    setViewCount,
    preview,
    handleLikeCount,
    isScrollDown,
    language,
  }
  return <PostContext.Provider value={values}>{children}</PostContext.Provider>
}
