import Link from 'next/link'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi'

function StudioNavbar(props: any) {
  return (
    <div>
      <div className='flex justify-between items-center p-5'>
        <Link href='/' className='text-purple-600 flex items-center text-sm'>
          <HiOutlineArrowCircleLeft className='h-5 w-5 text-purple-600 mr-2' />
          To Home
        </Link>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  )
}

export default StudioNavbar
