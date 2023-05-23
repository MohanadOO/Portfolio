import { HiOutlineHeart } from 'react-icons/hi'
import { usePost } from '../../hooks/usePost'

export default function LikeButton() {
  const { isLike, handleLikeCount } = usePost()

  if (isLike === 'loading') return <button></button>

  return (
    <button
      title={isLike ? 'Unlike Post' : 'Like Post'}
      onClick={handleLikeCount}
      className={`fixed ltr:right-[5%] rtl:left-[5%] bottom-36 md:bottom-44 xl:bottom-28 w-8 h-8 md:w-10 md:h-10 text-black dark:text-white border dark:border-white/10 shadow-lg rounded-full group z-50 ${
        isLike
          ? 'bg-pink-600 transition-colors'
          : 'bg-neutral-100 dark:bg-neutral-800'
      }`}
    >
      <HiOutlineHeart
        className={`w-4 h-4 md:w-6 md:h-6  mx-auto group-hover:scale-110 transition-all ${
          isLike ? 'text-white' : 'text-pink-700'
        }`}
      />{' '}
    </button>
  )
}
