import { AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai'

export function getNoteIcon(icon: string) {
  switch (icon) {
    case 'warning':
      return <AiOutlineWarning className=' md:w-6 md:h-6 bg-transparent' />
    case 'tip':
      return <AiOutlineInfoCircle className=' md:w-6 md:h-6 bg-transparent' />
    default:
      return <AiOutlineInfoCircle className=' md:w-6 md:h-6 bg-transparent' />
  }
}
