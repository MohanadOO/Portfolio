import Link from 'next/link'
import { HiOutlineArrowCircleLeft } from 'react-icons/hi'

function StudioNavbar(props: any) {
  return (
    <div>
      <>{props.renderDefault(props)}</>
    </div>
  )
}

export default StudioNavbar
